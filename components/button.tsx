import { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return (
    <button className="px-4 py-2 rounded bg-blue-400" {...props}>
      {children}
    </button>
  );
};

export default Button;
