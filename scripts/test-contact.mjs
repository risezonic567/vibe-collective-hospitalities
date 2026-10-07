import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import nodemailer from "nodemailer";

const envPath = resolve(process.cwd(), ".env.local");
const requiredVariables = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "MAIL_TO",
];

function parseEnvFile(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;

    let value = match[2].trim();
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
      value = value.slice(1, -1);
      if (quote === '"') value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }

    values[match[1]] = value;
  }

  return values;
}

function mask(value) {
  if (!value) return "(missing)";
  if (value.length <= 4) return "*".repeat(value.length);
  return `${value.slice(0, 2)}****${value.slice(-2)}`;
}

function reportConfiguredValues() {
  console.log("SMTP settings (masked):");
  for (const name of requiredVariables) {
    console.log(`  ${name}=${mask(process.env[name])}`);
  }
}

function explainStatus(status, body) {
  if (status === 200) {
    console.log("200: API ne enquiry accept ki. Dev server log check karein—route SMTP failure par bhi success de sakta hai.");
  } else if (status === 400) {
    console.log("400: Payload validation ya honeypot check fail hua.");
  } else if (status === 429) {
    console.log("429: Rate limit hit hui; ek minute ruk kar dobara try karein.");
  } else {
    console.log(`${status}: API request fail hui; response details dekhein.`);
  }

  console.log("API JSON response:");
  console.log(JSON.stringify(body, null, 2));
}

let envContents;
try {
  envContents = await readFile(envPath, "utf8");
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(".env.local nahi mili. Project root mein .env.example ko .env.local mein copy karke required variables fill karein.");
    console.error(`Required variable names: ${requiredVariables.join(", ")}`);
    process.exit(1);
  }

  console.error(".env.local read nahi ho saki; file permissions/path check karein.");
  process.exit(1);
}

const fileValues = parseEnvFile(envContents);
for (const name of requiredVariables) {
  if (process.env[name] === undefined && fileValues[name] !== undefined) {
    process.env[name] = fileValues[name];
  }
}

reportConfiguredValues();

const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim());
if (missingVariables.length) {
  console.error(`Missing/empty variables: ${missingVariables.join(", ")}`);
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("SMTP_PORT valid integer nahi hai (1–65535 required). Value print nahi ki gayi.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log("SMTP login verify kar rahe hain...");
try {
  await transporter.verify();
  console.log("SMTP login successful.");
} catch (error) {
  const safeCode = typeof error?.code === "string" ? error.code : "unknown";
  console.error(`SMTP login failed (error code: ${safeCode}). Credentials/SMTP settings provider ke dashboard se check karein; raw error aur secrets print nahi kiye.`);
  process.exit(1);
}

if (process.argv.includes("--smtp-only")) {
  console.log("--smtp-only set hai; API enquiry POST skip kiya.");
  process.exit(0);
}

const payload = {
  name: "Local Contact Test",
  email: "local-test@example.com",
  phone: "+919800000000",
  enquiryType: "Other",
  eventDate: "Nov 15, 2026",
  estimatedGuests: "25",
  cityVenue: "Bengaluru test venue",
  message: "Local SMTP delivery test enquiry. Please disregard this test message.",
  website: "",
};

console.log("http://localhost:3000/api/contact par test enquiry POST kar rahe hain...");
try {
  const response = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });

  let body;
  try {
    body = await response.json();
  } catch {
    body = { error: "Response valid JSON nahi thi." };
  }

  console.log(`HTTP status: ${response.status}`);
  explainStatus(response.status, body);
  if (!response.ok) process.exitCode = 1;
} catch (error) {
  const code = typeof error?.cause?.code === "string" ? error.cause.code : "network/timeout";
  console.error(`Local API tak request nahi pahunchi (${code}). Confirm karein npm run dev localhost:3000 par chal raha hai.`);
  process.exitCode = 1;
}
