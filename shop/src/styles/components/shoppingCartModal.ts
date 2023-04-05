import { styled } from "../";
import { Overlay, Content, Close } from "@radix-ui/react-dialog";

export const DialogContent = styled(Content, {
  backgroundColor: "$gray800",

  height: "100%",
  maxWidth: 580,
  width: "100%",
  padding: "3rem",

  position: "fixed",
  top: "50%",
  right: "0",

  transform: "translate(0%, -50%)",
});

export const DialogOverlay = styled(Overlay, {
  inset: 0,
  backgroundColor: "rgba(0,0,0,.3)",

  position: "fixed",
});

export const DialogClose = styled(Close, {
  position: "absolute",
  top: 24,
  right: 24,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  lineHeight: 0,

  backgroundColor: "transparent",
  color: "$gray300",
  border: 0,
  cursor: "pointer",
});

export const ProductDetails = styled("div", {
  display: "flex",
});
