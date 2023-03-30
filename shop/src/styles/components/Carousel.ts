import { styled } from "..";

export const CarouselContainer = styled("div", {
  maxWidth: "100%",

  overflow: "hidden",
  position: "relative",

  div: {
    height: "100%",
    display: "flex",
    gap: ".5rem",

    overflow: "scroll",
    scrollBehavior: "smooth",

    transition: "all 2s ease-in-out",

    "&:hover": {
      button: {
        opacity: 1,
      },
    },
  },
});

export const CarouselButtonContainer = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  inset: 0,

  maxWidth: "100%",
  padding: 10,

  button: {
    borderRadius: "50%",
    opacity: 0,
    cursor: "pointer",
    outline: "none",
    border: "none",

    zIndex: 10,
    lineHeight: 0,

    display: "flex",
    alignItems: "center",
    alignContent: "center",

    backgroundColor: "rgba(18, 18, 20, 0.6)",
    color: "$white",
    padding: ".5rem",

    transition: "all .2s ease-in-out",
    "&:active": {
      transform: "scale(.9)",
    },
  },
});
