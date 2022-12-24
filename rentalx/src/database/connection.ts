import { appDataSource } from "./dataSource";

async function createConnection(host = "database_ignite") {
  try {
    await appDataSource
      .setOptions({
        host,
      })
      .initialize();

    console.log("Conexão bem sucedida");
  } catch (error) {
    console.log("Erro na conexão", error);
  }
}
export { createConnection };
