import { appDataSource } from "./dataSource";

async function createConnection(host = "database_ignite") {
  try {
    await appDataSource
      .setOptions({
        host,
      })
      .initialize();

    console.log("Successful connection.");
  } catch (error) {
    console.log("Connection error: ", error);
  }
}
export { createConnection };
