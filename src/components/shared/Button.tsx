import { MouseEvent } from "react";
import { Button as MUIButton, SxProps } from "@mui/material";

interface Props {
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
}

const Button = ({ value, onClick, sx }: Props) => {
  return (
    <MUIButton variant="contained" sx={sx} onClick={onClick}>
      {value}
    </MUIButton>
  );
};

export default Button;
