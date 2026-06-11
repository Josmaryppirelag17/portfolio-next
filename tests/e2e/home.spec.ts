import { test, expect } from "@playwright/test";

test.describe("Portfolio — Home page", () => {
  test("page loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Josmary Pirela/);
  });

  test("skip link is present and focusable", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator("a[href='#main-content']");
    await expect(skipLink).toBeVisible();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test("language toggle buttons are present and clickable", async ({ page }) => {
    await page.goto("/");
    const esBtn = page.locator('button[aria-label="Español"]').first();
    const enBtn = page.locator('button[aria-label="English"]').first();
    await expect(esBtn).toBeVisible();
    await expect(enBtn).toBeVisible();
    await enBtn.click();
    await expect(enBtn).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", {
      name: "Navegación principal",
    });
    await expect(nav).toBeVisible();
    const links = nav.locator("a");
    await expect(links.first()).toBeVisible();
  });

  test("contact form has all fields", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page.locator("#contact-email")).toBeVisible();
    await expect(page.locator("#contact-message")).toBeVisible();
  });

  test("sitemap returns valid XML", async ({ page }) => {
    const res = await page.request.get("/api/sitemap");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const text = await res.text();
    expect(text).toContain('<?xml version="1.0"');
    expect(text).toContain("<urlset");
  });
});
