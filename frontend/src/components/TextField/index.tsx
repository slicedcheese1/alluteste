import { InputBaseComponentProps } from "@mui/material";
import { ElementType, InputHTMLAttributes } from "react";
import { TextField as MuiTextfield } from "@mui/material";
export interface TextFieldProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    Exclude<keyof InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">
  > {
  variant?: "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium";
  disabled?: boolean;
  label?: string;
  defaultValue?: string;
  error?: string;
  inputComponent?: ElementType<InputBaseComponentProps>;
  inputProps?: InputBaseComponentProps;
  onChange?: (value: string) => void;
  required?: boolean;
}

export function TextField({
  variant = "outlined",
  color = "primary",
  size = "small",
  label,
  defaultValue,
  error,
  inputProps,
  disabled,
  onChange,
  required,
  ...props
}: TextFieldProps) {
  return (
    <MuiTextfield
      {...props}
      variant={variant}
      color={color}
      size={size}
      label={label}
      defaultValue={defaultValue}
      onChange={event => onChange?.(event?.target?.value)}
      disabled={disabled}
      inputProps={inputProps}
      error={!error === false}
      helperText={error}
      required={required}
    />
  );
}
