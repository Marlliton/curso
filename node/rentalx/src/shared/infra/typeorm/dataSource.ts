import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["src/modules/**/entities/*.ts"],
})

export { appDataSource };
