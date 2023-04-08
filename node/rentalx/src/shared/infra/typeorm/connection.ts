import { appDataSource } from "./dataSource";

async function createConnection(host = "database_ignite") {
  try {
    const connection = await appDataSource
      .setOptions({
        host: process.env.NODE_ENV === "test" ? "localhost" : host,
        database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
      })
      .initialize();

    console.log(
      "Successful connection with: ",
      process.env.NODE_ENV === "test" ? "localhost" : host
    );
    return connection;
  } catch (error) {
    throw `Ocorreu um erro ao conectar: ${error}`;
  }
}
export { createConnection };
