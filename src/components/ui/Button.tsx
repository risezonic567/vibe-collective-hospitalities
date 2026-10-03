import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-[0.15em] uppercase text-xs font-medium transition-all duration-300 rounded-[2px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none group";

  const sizeStyles = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-xs tracking-[0.2em]",
  };

  const variantStyles = {
    primary:
      "bg-[#1d3347] text-[#f7f3ec] border border-[#1d3347] hover:bg-[#142433] hover:border-[#b8975a] shadow-sm",
    secondary:
      "bg-[#f7f3ec] text-[#1d3347] border border-[#e8dfd0] hover:bg-[#ffffff] hover:border-[#b8975a] shadow-sm",
    outline:
      "bg-transparent text-current border border-current hover:bg-current hover:text-[#1d3347] transition-colors",
    gold: "bg-[#b8975a] text-[#14202b] border border-[#b8975a] hover:bg-[#cca96a] shadow-sm font-semibold",
    ghost:
      "bg-transparent text-current hover:text-[#b8975a] underline-offset-4 hover:underline p-0",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        <span>{children}</span>
        {icon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonAsButton)}>
      <span>{children}</span>
      {icon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
}
