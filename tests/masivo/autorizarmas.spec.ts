import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.setTimeout(300000);

test("Autorizar masivo", async ({ page }) => {
  const otp = process.env.DIGIPASS ?? "";

  expect(otp).not.toBe("");

  await page.goto(process.env.BASE_URL!);

  // Login
  await page.getByRole("textbox", { name: "RUT RUT" }).fill(process.env.RUT!);

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

  // Validar login exitoso
  await expect(
    page.getByRole("button", {
      name: "Pagos y Transferencias",
    })
  ).toBeVisible({
    timeout: 60000,
  });

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

  await page.getByRole('link', { name: 'Autorizar por archivo' }).click();
  await page.locator('#mat-checkbox-13 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page.getByText('RESUMEN DE SELECCIÓN: 1').click();
  await page.getByRole('button', { name: 'CONTINUAR CON AUTORIZACIÓN' }).click();
  await page.getByRole('heading', { name: 'Confirma los archivos con' }).click();
  await page.getByText('Digipass').click();
  await page.getByRole('textbox', { name: 'DigiPass Digito 0' }).fill('8');
  await page.getByRole('textbox', { name: 'DigiPass Digito 1' }).fill('8');
  await page.getByRole('textbox', { name: 'DigiPass Digito 2' }).fill('8');
  await page.getByRole('textbox', { name: 'DigiPass Digito 3' }).fill('8');
  await page.getByRole('textbox', { name: 'DigiPass Digito 4' }).fill('8');
  await page.getByRole('textbox', { name: 'DigiPass Digito 5' }).fill('8');
  await page.getByRole('button', { name: 'Autorizar archivo(s)' }).click();
  await page.getByLabel('Ingresa tu dispositivo de').locator('section').filter({ hasText: 'autorizando con TERCERA CLAVE' }).click();
  await page.getByText('Ingresa tu Clave Dinámica').click();
  await page.getByRole('textbox', { name: 'Clave Dinámica' }).click();
});

