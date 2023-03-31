import Strip from "stripe";

export const stripe = new Strip(process.env.STRIP_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Shop",
  },
});
