import dotenv from "dotenv";
dotenv.config();

import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.setTimeout(120000);

test("Agregar e inscribir masivo", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navegar(process.env.BASE_URL!);

  await loginPage.iniciarSesion(process.env.RUT!, process.env.PASSWORD!);
});
