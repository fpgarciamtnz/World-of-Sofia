import { expect, test } from "@playwright/test";

test("catalog and detail routes render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Ideas become skills. Skills stay separable." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Descartes Foundation Ledger" })).toBeVisible();

  await page.goto("/skills/descartes-foundation-ledger");
  await expect(page.getByRole("heading", { level: 1, name: "Descartes Foundation Ledger" })).toBeVisible();

  await page.goto("/philosophers/rene-descartes");
  await expect(page.getByRole("heading", { level: 1, name: "Rene Descartes" })).toBeVisible();
});
