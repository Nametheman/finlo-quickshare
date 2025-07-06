import React, { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import SpinningLoader from "../spinner";

// Button variant types
type ButtonVariant = "primary" | "secondary" | "destructive";

// Button props interface
interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  title,
  className,
  disabled = false,
  fullWidth = false,
  loading = false,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = (e: any) => {
    setIsPressed(true);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    setIsPressed(false);
    onPressOut?.(e);
  };

  const buttonClasses = `
    px-4 py-3 
    rounded-md 
    items-center 
    disabled:bg-neutral-gray
    justify-center 
    ${fullWidth ? "w-full" : "w-auto"} 
    ${
      variant === "primary"
        ? `${
            isPressed ? "bg-primary-dark-green" : "bg-primary-green"
          } text-white`
        : variant === "secondary"
          ? `${
              isPressed ? "bg-primary-green/10" : "bg-transparent"
            } border border-primary-green ${
              isPressed ? "text-primary-dark-green" : "text-primary-green"
            }`
          : `${isPressed ? "bg-error-red" : "bg-accent-red"} text-white`
    }
    ${className || ""}
  `;

  const textClasses = `
    text-lg 
    font-semibold 
    text-center
    ${
      variant === "secondary"
        ? `${isPressed ? "text-primary-dark-green" : "text-primary-green"}`
        : "text-white"
    }
  `;

  return (
    <TouchableOpacity
      className={buttonClasses}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      {...rest}
    >
      <Text className={textClasses}>
        {loading ? <SpinningLoader /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
