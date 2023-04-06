import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    paddingBottom: "5rem",
    maxWidth: 560,
    textAlign: "center",

    color: "$gray300",
  },

  a: {
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "$lg",

    "&:hover": {
      color: "$green300",
      transition: ".2s ease-in-out",
    },
  },
});

export const ImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",

  padding: "2rem",
});

export const ImageWrapper = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".25rem",
  margin: "0 -30px",

  img: {
    objectFit: "cover",
  },

  boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.5);",
});
