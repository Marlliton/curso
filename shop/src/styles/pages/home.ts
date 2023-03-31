import { styled } from "..";
import Link from "next/link";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  gap: "3rem",

  minHeight: 656,
});

export const Product = styled(Link, {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "8px",

  position: "relative",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".25rem",

  minWidth: "30rem",

  overflow: "hidden",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    margin: 4,
    bottom: ".25rem",
    left: ".25rem",
    right: ".25rem",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "6px",

    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all .2s ease-in-out",

    fontSize: "$lg",
    color: "$gray100",

    span: {
      color: "$green300",
      fontSize: "$xl",
      fontWeight: "bold",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
