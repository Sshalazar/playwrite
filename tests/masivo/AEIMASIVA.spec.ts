import { test, expect } from "@playwright/test";

test("Agregar e inscribir masivo con error", async ({ page }) => {
  await page.goto("https://portalempresas.qa.bancochile.cl/empresa");
  await page.getByRole("textbox", { name: "RUT RUT" }).click();
  await page.getByRole("textbox", { name: "RUT RUT" }).fill("1.316.441-67");
  await page.getByRole("textbox", { name: "Contraseña Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .fill("Banco001");
  await page
    .getByRole("textbox", { name: "Contraseña Contraseña" })
    .press("Enter");
  await page.getByRole("button", { name: "Pagos y Transferencias" }).click();
  await page.getByRole("button", { name: " Transferencias Moneda" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("link", { name: "Agregar e Inscribir por" }).click();
  await page.waitForTimeout(3000);
  await page.getByText("A continuación encontrarás el").click();
  await page.getByRole("textbox", { name: "Nombre del archivo *" }).click();
  await page
    .getByRole("textbox", { name: "Nombre del archivo *" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Nombre del archivo *" })
    .fill("Prueba automatizada");
  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles("tests data/MasivaMultiME.xls");
  await page.waitForTimeout(3000);

  await page.getByText("El archivo no ha sido cargado").click();
  await page.waitForTimeout(3000);
});
