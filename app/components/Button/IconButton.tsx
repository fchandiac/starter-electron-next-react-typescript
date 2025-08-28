import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  variant?: "contained-primary" | "contained-secondary" | "text";
  className?: string;
  [key: string]: any;
}

const variantClasses: Record<string, string> = {
  "contained-primary": "btn-icon-contained-primary",
  "contained-secondary": "btn-icon-contained-secondary",
  text: "btn-icon-text",
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "contained-primary",
  className = "",
  ...props
}) => {
  // Si el children es un ícono (span con material-symbols), le agregamos select-none
  const wrapIcon = (child: React.ReactNode) => {
    if (
      React.isValidElement(child) &&
      typeof child.type === "string" &&
      child.type === "span" &&
      typeof (child as React.ReactElement<any>).props.className === "string" &&
      (child as React.ReactElement<any>).props.className.includes("material-symbols")
    ) {
      return React.cloneElement(child as React.ReactElement<any>, {
        className: `${(child as React.ReactElement<any>).props.className} select-none`,
      });
    }
    return child;
  };
  return (
    <div
      className={`${variantClasses[variant] || variantClasses["contained-primary"]} ${className}`}
      {...props}
    >
      {React.Children.map(children, wrapIcon)}
    </div>
  );
};
