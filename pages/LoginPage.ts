import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async navegar(url: string) {
    await this.page.goto(url);
  }

  async ingresarRut(rut: string) {
    await this.page.getByRole("textbox", { name: "RUT RUT" }).fill(rut);
  }

  async ingresarPassword(password: string) {
    await this.page
      .getByRole("textbox", {
        name: "Contraseña Contraseña",
      })
      .fill(password);
  }

  async iniciarSesion(rut: string, password: string) {
    await this.ingresarRut(rut);
    await this.ingresarPassword(password);

    await this.page
      .getByRole("textbox", {
        name: "Contraseña Contraseña",
      })
      .press("Enter");

    // Validar login exitoso
    await expect(
      this.page.getByRole("button", {
        name: "Pagos y Transferencias",
      })
    ).toBeVisible({
      timeout: 60000,
    });
  }
}
