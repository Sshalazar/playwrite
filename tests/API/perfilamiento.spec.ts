import { test, expect } from "@playwright/test";

test("GET perfilamiento", async ({ request }) => {
  const response = await request.get(
    "https://portalempresas.qa.bancochile.cl/mibancochile/rest/empresa/perfilamiento/"
  );

  expect(response.status()).toBe(200);

  const body = await response.text();

  console.log(body);

  expect(body).toBeTruthy();
});
