import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.setTimeout(300000);

test("Autorizar masivo", async ({ page }) => {
  const otp = process.env.DIGIPASS ?? "";

  await page.goto(process.env.BASE_URL!);

  // Login
  await page.getByRole("textbox", { name: "RUT RUT" }).fill(process.env.RUT2!);

  await page
    .getByRole("textbox", {
      name: "Contraseña Contraseña",
    })
    .fill(process.env.PASSWORD!);

  await page
    .getByRole("textbox", {
      name: "Contraseña Contraseña",
    })
    .press("Enter");

  // Navegación
  await page
    .getByRole("button", {
      name: "Pagos y Transferencias",
    })
    .click();

  await page
    .getByRole("button", {
      name: /Transferencias Moneda/i,
    })
    .click();

  await page
    .getByRole("link", {
      name: /Autorizar por archivo/i,
    })
    .click();
  await page.locator('div').filter({ hasText: 'Podrás autorizar un máximo de' }).nth(5).click();
  await page.getByRole('heading', { name: 'Transferencias por autorizar' }).click();
  await page.locator('div').filter({ hasText: /^Buscar$/ }).first().click();
  await page.getByRole('textbox', { name: 'Buscar' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Buscar' }).fill('Prueba automatizada');
    await page.waitForTimeout(5000);
  await page.getByRole('gridcell', { name: 'Prueba automatizada' }).first().click();
  await page.locator('#mat-checkbox-13 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page.locator('div').filter({ hasText: 'RESUMEN DE SELECCIÓN: 1' }).nth(4).click();
  await page.locator('#paso-moneda-ext-2 > div').first().click();
  await page.getByRole('button', { name: 'ver otras monedas' }).click();
  await page.getByRole('heading', { name: 'Totales por moneda' }).click();
    await page.getByText('USD,EUR,GBP,JPY,CNY').click();
  await page.getByRole('button', { name: 'Cerrar cuadro de diálogo' }).click();
  await page.getByRole('button', { name: 'CONTINUAR CON AUTORIZACIÓN' }).click();
  await page.locator('#transferencias section').click();
  await page.locator('.container.ng-star-inserted').click();
});