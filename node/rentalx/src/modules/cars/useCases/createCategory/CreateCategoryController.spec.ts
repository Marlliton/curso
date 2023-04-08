import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm/connection";
import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

let connection: DataSource;

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = v4();
    const password = hash("admin", 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("categories").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    console.log(responseToken.body);

    const response = await request(app).post("/categories").send({
      name: "Luxo",
      description: "Carros de luxo",
    });

    expect(response.statusCode).toBe(201);
  });
});
