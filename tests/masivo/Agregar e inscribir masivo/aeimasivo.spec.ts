import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test.setTimeout(300000);

test("Agregar e inscribir masivo", async ({ page }) => {
  const otp = process.env.DIGIPASS ?? "";

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

  // Inscribir
  const btnInscribir = page.getByRole("button", {
    name: "Inscribir operación",
  });

  await expect(btnInscribir).toBeVisible();
  await expect(btnInscribir).toBeEnabled();

  await btnInscribir.click();

  // Validar que entró al procesamiento

  await expect(
    page.getByText(/Estamos finalizando la inscripción/i)
  ).toBeVisible({
    timeout: 300000,
  });

  // Esperar que desaparezca el loader/proceso
  await expect(
    page.getByRole("heading", {
      name: /Estamos finalizando la inscripción/i,
    })
  ).toBeHidden({
    timeout: 180000,
  });

  // Validar comprobante
  await expect(
    page.getByRole("heading", {
      name: /Comprobante de Transferencia/i,
    })
  ).toBeVisible({
    timeout: 180000,
  });

  // Descargar comprobante
  const downloadPromise = page.waitForEvent("download");

  await page
    .getByRole("button", {
      name: /descargar/i,
    })
    .click();

  const download = await downloadPromise;

  console.log("Archivo descargado:", download.suggestedFilename());

  await page
    .getByRole("button", {
      name: /aceptar/i,
    })
    .click();
});
