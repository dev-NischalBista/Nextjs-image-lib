import React from "react";
import { cn } from "@/lib/utlis";

const CustomButton = ({
  title,
  icon,
  onClick,
  className,
}: {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-black/50 text-white/50 backdrop-blur-lg hover:text-white p-2 rounded-full text-sm transition-colors duration-300 ease-out",
        className || ""
      )}
    >
      {title && title}
      {icon && icon}
    </button>
  );
};

export default CustomButton;
