import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-[1240px]",
    wide: "max-w-[1400px]",
  };

  return (
    <div
      className={`w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-12 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
}
