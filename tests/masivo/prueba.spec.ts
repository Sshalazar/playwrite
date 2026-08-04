import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { LoginPage } from "../../pages/LoginPage";
dotenv.config();

test.setTimeout(300000);

test("Agregar e inscribir masivo", async ({ page }) => {
  const otp = process.env.DIGIPASS ?? "";

  expect(otp).not.toBe("");

  const loginPage = new LoginPage(page);

  await loginPage.navegar(process.env.BASE_URL!);

  await loginPage.iniciarSesion(process.env.RUT!, process.env.PASSWORD!);

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
      name: /Agregar e Inscribir por/i,
    })
    .click();

  // Validar pantalla de carga masiva
  await expect(
    page.getByRole("textbox", {
      name: "Nombre del archivo *",
    })
  ).toBeVisible({
    timeout: 60000,
  });

  // Carga archivo
  await page
    .getByRole("textbox", {
      name: "Nombre del archivo *",
    })
    .fill("Prueba automatizada");

  await page
    .locator('input[type="file"]')
    .setInputFiles("tests data/mASIVAmULTI.xlsx");

  // Selección dispositivo
  await page.locator("section:nth-child(2) > div > .col-12.d-flex").click();

  // Ingreso Digipass
  for (let i = 0; i < otp.length; i++) {
    await page
      .getByRole("textbox", {
        name: `DigiPass Digito ${i}`,
      })
      .fill(otp[i]);
  }

  await page.waitForTimeout(2000);

  // Esperar habilitación del botón
  const btnInscribir = page.getByRole("button", {
    name: "Inscribir operación",
  });

  await expect(btnInscribir).toBeVisible({
    timeout: 30000,
  });

  await expect(btnInscribir).toBeEnabled({
    timeout: 30000,
  });

  // Inscribir
  await btnInscribir.click();

  // Pantalla de procesamiento
  const loaderText = page.getByText(/Estamos finalizando la inscripción/i);

  await expect(loaderText).toBeVisible({
    timeout: 30000,
  });

  await expect(loaderText).toBeHidden({
    timeout: 180000,
  });

  // Esperar URL de comprobante
  await page.waitForURL(/InscribirMasivo\/comprobante/, {
    timeout: 180000,
  });

  // Validar comprobante
  await expect(
    page.getByRole("heading", {
      name: /Comprobante de Transferencia/i,
    })
  ).toBeVisible({
    timeout: 60000,
  });

  // Descargar comprobante
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page
      .getByRole("button", {
        name: /descargar/i,
      })
      .click(),
  ]);

  console.log("Archivo descargado:", download.suggestedFilename());

  // Finalizar
  await page
    .getByRole("button", {
      name: /aceptar/i,
    })
    .click();
});
