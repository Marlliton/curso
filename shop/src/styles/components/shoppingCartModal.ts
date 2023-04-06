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

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  footer: {
    paddingTop: "1rem",
    div: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1rem",

      paddingBottom: ".5rem",
    },

    h2: {
      fontSize: "$md",
      paddingBottom: "1rem",
    },

    strong: {
      fontSize: "$xl",
    },

    button: {
      marginTop: "1.5rem",
      padding: "1rem",
      backgroundColor: "$green500",
      cursor: "pointer",

      border: "none",
      outline: "none",
      width: "100%",
      borderRadius: 8,

      fontWeight: "bold",
      color: "$gray300",
      fontSize: "$lg",

      "&:hover": {
        transition: "all .2s",
        filter: "brightness(.9)",
      },
    },
  },
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

export const ProductWrapper = styled("ul", {
  height: "100%",
  overflowY: "scroll",
  marginTop: "1rem",
});

export const ProductDetails = styled("li", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gap: "1rem",

  paddingTop: "1rem",

  img: {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: "8px",

    padding: ".25rem",
  },

  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",

    height: "100%",

    p: {
      color: "$gray300",
    },
    span: {
      color: "$gray100",
      fontWeight: "bold",
    },

    button: {
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "$green500",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",

      "&:hover": {
        transition: "all .2s",
        color: "$green300",
      },
    },
  },
});
