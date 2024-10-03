import { MouseEvent } from "react";
import { Button as MUIButton, ButtonProps, SxProps } from "@mui/material";

interface Props {
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
  disabled?: boolean;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
}

const Button = ({
  value,
  onClick,
  sx,
  disabled,
  variant = "contained",
  color,
}: Props) => {
  return (
    <MUIButton
      sx={sx}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
    >
      {value}
    </MUIButton>
  );
};

export default Button;
