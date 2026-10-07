import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");
const extensions = [".js", ".jsx", ".mjs", ".cjs"];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

function relativePath(absolutePath) {
  return path.relative(projectRoot, absolutePath).split(path.sep).join("/");
}

function routeFromFile(filePath) {
  const relative = path.relative(path.join(sourceRoot, "app"), filePath).split(path.sep).join("/");
  const fileName = path.posix.basename(relative);
  const folder = path.posix.dirname(relative);
  const routeFolder = folder === "." ? "" : folder;

  if (fileName === "favicon.ico") return { route: "/favicon.ico", kind: "favicon asset" };

  if (fileName === "page.js" || fileName === "page.jsx") {
    const route = `/${routeFolder}`.replace(/\/$/, "") || "/";
    return { route: route.replace(/\[\.\.\.(.*?)\]/g, ":$1*").replace(/\[(.*?)\]/g, ":$1"), kind: "page" };
  }

  if (fileName === "route.js" || fileName === "route.jsx") {
    const route = `/${routeFolder}`.replace(/\/$/, "") || "/";
    return { route: route.replace(/\[\.\.\.(.*?)\]/g, ":$1*").replace(/\[(.*?)\]/g, ":$1"), kind: "API route handler" };
  }

  const specialRoutes = {
    "sitemap.js": "/sitemap.xml",
    "robots.js": "/robots.txt",
    "opengraph-image.js": "/opengraph-image",
    "opengraph-image.jsx": "/opengraph-image",
  };
  if (specialRoutes[fileName]) return { route: specialRoutes[fileName], kind: "metadata route" };

  const specialFiles = new Set([
    "layout.js", "layout.jsx", "loading.js", "loading.jsx", "error.js", "error.jsx",
    "not-found.js", "not-found.jsx", "global-error.js", "global-error.jsx",
    "template.js", "template.jsx", "default.js", "default.jsx",
  ]);
  if (specialFiles.has(fileName)) {
    const route = fileName.startsWith("not-found.")
      ? "/_not-found"
      : `/${routeFolder}`.replace(/\/$/, "") || "/";
    return { route, kind: `${fileName.replace(/\.(jsx?|mjs|cjs)$/, "")} special file` };
  }

  return null;
}

function resolveImport(importerPath, specifier) {
  let basePath;
  if (specifier.startsWith("@/")) {
    basePath = path.join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    basePath = path.resolve(path.dirname(importerPath), specifier);
  } else {
    return null;
  }

  const candidates = [basePath, ...extensions.map((extension) => `${basePath}${extension}`), ...extensions.map((extension) => path.join(basePath, `index${extension}`))];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

const sourceFiles = walk(sourceRoot).filter((filePath) => extensions.includes(path.extname(filePath)));
const appFiles = walk(path.join(sourceRoot, "app"));
const routes = appFiles.map((filePath) => ({ filePath, ...routeFromFile(filePath) })).filter((entry) => entry.route);
const pagesAndHandlers = routes.filter((entry) => entry.kind === "page" || entry.kind === "API route handler");
const specialRoutes = routes.filter((entry) => entry.kind !== "page" && entry.kind !== "API route handler");

console.log("Routes");
for (const entry of pagesAndHandlers.sort((a, b) => a.route.localeCompare(b.route))) {
  const marker = entry.kind === "API route handler" ? " [API]" : "";
  console.log(`${entry.route} -> ${relativePath(entry.filePath)}${marker}`);
}

console.log("\nMetadata routes and App Router special files");
for (const entry of specialRoutes.sort((a, b) => a.filePath.localeCompare(b.filePath))) {
  console.log(`${entry.route} (${entry.kind}) -> ${relativePath(entry.filePath)}`);
}

console.log("\nFiles with a top-level use client directive");
const clientFiles = sourceFiles.filter((filePath) => /^\uFEFF?\s*["']use client["']\s*;/.test(fs.readFileSync(filePath, "utf8")));
for (const filePath of clientFiles.sort()) console.log(relativePath(filePath));

const componentsRoot = path.join(sourceRoot, "components");
const componentFiles = walk(componentsRoot).filter((filePath) => extensions.includes(path.extname(filePath)));
const importers = new Map(componentFiles.map((filePath) => [path.resolve(filePath), []]));
const importPattern = /(?:\bfrom\s*|\bimport\s*\()(["'])([^"']+)\1/g;

for (const importerPath of sourceFiles) {
  const contents = fs.readFileSync(importerPath, "utf8");
  for (const match of contents.matchAll(importPattern)) {
    const importedPath = resolveImport(importerPath, match[2]);
    if (importedPath && importers.has(path.resolve(importedPath))) {
      importers.get(path.resolve(importedPath)).push(relativePath(importerPath));
    }
  }
}

console.log("\nComponents and importers");
for (const componentPath of componentFiles.sort()) {
  const usedBy = [...new Set(importers.get(path.resolve(componentPath)))];
  console.log(`${relativePath(componentPath)} -> ${usedBy.length} importer(s)${usedBy.length ? `: ${usedBy.join(", ")}` : ""}`);
}
