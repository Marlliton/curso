import { styled } from "../";

export const ProductContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "4rem",

  maxWidth: 1180,
  width: "100%",
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  color: "red",
  borderRadius: 8,

  maxWidth: 576,
  height: 656,

  padding: ".25rem",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  justifyContent: "space-between",

  h1: {
    fontSize: "$2xl",
    paddingBottom: "1rem",
    color: "$gray300",
  },

  span: {
    fontSize: "$2xl",
    color: "$green300",
    paddingBottom: "2.5rem",
    display: "block",

    lineHeight: 1.6,
  },

  button: {
    backgroundColor: "$green500",
    color: "$gray300",
    padding: "1rem",

    borderRadius: 8,
    fontWeight: "bold",
    fontSize: "$md",
    cursor: "pointer",

    border: "none",

    "&:disabled": {
      cursor: "not-allowed",
      filter: "brightness(.8)",
    },

    "&:not(:disabled):hover": {
      transition: ".2s",
      filter: "brightness(.9)",
    },
  },
});
