import { test, expect } from "@playwright/test";

test("AGREGAR E INSCRIBIR UNITARIA", async ({ page }) => {
  test.setTimeout(120000);

  await page.goto("https://portalempresas.qa.bancochile.cl/empresa");

  // Login
  await page.getByRole("textbox", { name: /rut/i }).fill("13.164.416-7");
  await page.getByRole("textbox", { name: /contraseña/i }).fill("Banco001");

  await Promise.all([
    page.waitForURL(/home|dashboard|empresa/, { timeout: 600000 }),
    page.getByRole("button", { name: /ingresar/i }).click(),
  ]);

  // ✅ aumentar espera SOLO en la última parteeeeee

  await page.getByRole("button", { name: "Pagos y Transferencias" }).click();
  await page.getByRole("button", { name: " Transferencias Moneda" }).click();
  await page
    .getByRole("link", { name: "Agregar e Inscribir", exact: true })
    .click();
  const chevron = page.locator(".btn-chevron").first();

  // ✅ esperar antes de interactuar
  await expect(chevron).toBeVisible({ timeout: 600000 });
  await expect(chevron).toBeEnabled();

  // ✅ recién aquí haces click
  await chevron.click();
  await page
    .locator("div")
    .filter({ hasText: "Cuenta Corriente M/E USD 00-" })
    .nth(5)
    .click();
  await page
    .locator(
      ".mat-icon.notranslate.material-icons.mat-icon-no-color.ng-tns-c94-3 > .btn-chevron"
    )
    .click();
  await page.getByRole("combobox", { name: "Beneficiario" }).click();
  await page.getByRole("combobox", { name: "Beneficiario" }).fill("quin");

  //const opcion = page.getByText(/Quintay sa/i);

  //await opcion.waitFor({ state: 'visible', timeout: 60000 });
  //await opcion.click();

  await page.getByText("Quintay sa").click();
  await page.getByRole("textbox", { name: "Monto" }).click();
  await page.getByRole("textbox", { name: "Monto" }).fill("34");
  await page.getByRole("button", { name: "AGREGAR E INSCRIBIR" }).click();
  await page.locator("section:nth-child(2) > div > .col-12.d-flex").click();
  await page.getByRole("textbox", { name: "DigiPass Digito 0" }).fill("8");
  await page.getByRole("textbox", { name: "DigiPass Digito 1" }).fill("8");
  await page.getByRole("textbox", { name: "DigiPass Digito 2" }).fill("8");
  await page.getByRole("textbox", { name: "DigiPass Digito 3" }).fill("8");
  await page.getByRole("textbox", { name: "DigiPass Digito 4" }).fill("8");
  await page.getByRole("textbox", { name: "DigiPass Digito 5" }).fill("8");
  await page.getByRole("button", { name: "Inscribir operación" }).click();
});
