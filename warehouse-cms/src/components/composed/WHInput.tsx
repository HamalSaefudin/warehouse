import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface WHInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export const WHInput = ({
  label,
  error,
  helperText,
  required,
  containerClassName,
  labelClassName,
  errorClassName,
  helperClassName,
  className,
  id,
  ...props
}: WHInputProps) => {
  // Generate unique ID if not provided
  const inputId = id || `whinput-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium text-gray-500",
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}

      <Input
        id={inputId}
        className={cn(
          "py-6",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className={cn("text-sm text-red-600", errorClassName)}
          role="alert"
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className={cn("text-sm text-gray-500", helperClassName)}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
