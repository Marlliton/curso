import { styled } from "..";

export const ShoppingCartBagContainer = styled("button", {
  height: "3rem",
  width: "3rem",

  border: "none",
  outline: "none",
  cursor: "pointer",
  color: "$gray300",

  borderRadius: 6,
  backgroundColor: "$gray800",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  position: "relative",

  "&:hover": {
    transition: "all .2s ease-in-out",
    filter: "brightness(.9)",
  },
});

export const Counter = styled("div", {
  position: "absolute",
  top: -6,
  right: -6,

  height: 24,
  width: 24,
  borderRadius: "50%",

  backgroundColor: "$green500",
  color: "$gray300",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontWeight: "bold",

  border: "solid 2px $gray900",
});
