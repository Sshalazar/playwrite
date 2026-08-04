import { test, expect } from "@playwright/test";

test("POST saldo", async ({ request }) => {
  const response = await request.post(
    "http://bff-pemp-servicios-transferencias.app-nipe.cn-qa.ocilabscl.bancodechile.cl/tef-nva/saldo",
    {
      params: {
        numero: 80537000,
        dv: "9",
        valid: true,
      },
      data: {
        additionalProp1: "724200",
        additionalProp2: "string",
        additionalProp3: "string",
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log(body);
});
