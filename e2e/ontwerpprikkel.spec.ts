import { expect, test, type Page } from "@playwright/test";

const challengeHeading = (page: Page) =>
  page.getByRole("heading", { level: 1 });

async function openHome(page: Page) {
  await page.goto("/");
  await expect(challengeHeading(page)).toContainText("Ontwerp een");
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
  await openHome(page);
});

test("basispagina laadt met kernonderdelen", async ({ page }) => {
  await expect(page.getByText("OntwerpPrikkel")).toBeVisible();
  await expect(page.getByRole("button", { name: /Type:/ })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "↻ Nieuwe uitdaging" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Kies werkvorm/ }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 3 })).toBeVisible();
});

test("nieuwe uitdaging blijft bruikbare ontwerpzin tonen", async ({ page }) => {
  const initial = (await challengeHeading(page).innerText()).trim();
  let latest = initial;

  for (let attempt = 0; attempt < 3; attempt++) {
    await page.getByRole("button", { name: "↻ Nieuwe uitdaging" }).click();
    await expect(challengeHeading(page)).toContainText("Ontwerp een");
    latest = (await challengeHeading(page).innerText()).trim();
    if (latest && latest !== initial) {
      break;
    }
  }

  await expect(challengeHeading(page)).toContainText("Ontwerp een");
  expect(initial.length).toBeGreaterThan(0);
  expect(latest.length).toBeGreaterThan(0);
});

test("filters kunnen worden aangepast en generatie blijft werken", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Type:/ }).click();
  await page.getByRole("option", { name: "Systeem" }).click();

  await page.getByRole("button", { name: /Richting:/ }).click();
  await page.getByRole("option", { name: "Duurzaamheid" }).click();

  await page.getByRole("button", { name: /Randvoorwaarde:/ }).click();
  await page.getByRole("option", { name: "Zonder stroom" }).click();

  await page.getByRole("button", { name: "↻ Nieuwe uitdaging" }).click();
  await expect(challengeHeading(page)).toContainText("Ontwerp een");
  await expect(page.getByText("Geen passende combinatie gevonden")).toHaveCount(
    0,
  );
});

test("segment lock blijft klikbaar en app blijft genereren", async ({
  page,
}) => {
  const lockButton = page.locator('button[title="Vastzetten"]').first();
  await lockButton.click();
  await expect(
    page.getByRole("button", { name: "Segment ontgrendelen" }).first(),
  ).toBeVisible();

  await page.getByRole("button", { name: "↻ Nieuwe uitdaging" }).click();
  await expect(challengeHeading(page)).toContainText("Ontwerp een");
});

test("werkvorm kiezen wijzigt werkvormpaneel", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 3 })).toHaveText("Crazy 8");

  await page.getByRole("button", { name: /Kies werkvorm/ }).click();
  await page.getByRole("option", { name: "SCAMPER" }).click();

  await expect(page.getByRole("heading", { level: 3 })).toHaveText("SCAMPER");
  await expect(
    page.getByText("Een eerste idee verbeteren via vaste denkstappen."),
  ).toBeVisible();
});

test("idee opslaan, opnieuw gebruiken en verwijderen", async ({ page }) => {
  await page.getByRole("button", { name: "★ Bewaar" }).click();
  await expect(page.getByRole("status")).toContainText("Idee opgeslagen");

  await page
    .getByRole("button", { name: "Opgeslagen ideeën", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 2, name: "Opgeslagen ideeën" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Gebruik opnieuw" }),
  ).toHaveCount(1);

  await page.getByRole("button", { name: "Gebruik opnieuw" }).first().click();
  await expect(challengeHeading(page)).toContainText("Ontwerp een");

  await page
    .getByRole("button", { name: "Verwijder" })
    .first()
    .click({ force: true });

  await page
    .getByRole("button", { name: "Opgeslagen ideeën", exact: true })
    .click();
  await expect(
    page.getByText("Je hebt nog geen ideeën opgeslagen."),
  ).toBeVisible();
});

test("kopieer toont succes bij werkend clipboard", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as Window & { __copiedText?: string }).__copiedText = text;
        },
      },
    });
  });

  await page.getByRole("button", { name: "📋 Kopieer" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Gekopieerd naar klembord",
  );

  const copiedText = await page.evaluate(
    () => (window as Window & { __copiedText?: string }).__copiedText,
  );
  expect(copiedText).toBeTruthy();
});

test("kopieer toont fallback bij clipboard-fout", async ({ page }) => {
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("blocked");
        },
      },
    });
  });

  await page.getByRole("button", { name: "📋 Kopieer" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Kopiëren faalde: kopieer handmatig uit het tekstvak",
  );

  const manualTextarea = page.getByRole("textbox", {
    name: "Tekst om handmatig te kopiëren",
  });
  await expect(manualTextarea).toBeVisible();
  await expect(manualTextarea).not.toHaveValue("");
});

test("slotjes wissen en filters resetten houdt app bruikbaar", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Type:/ }).click();
  await page.getByRole("option", { name: "Systeem" }).click();

  const lockButton = page.locator('button[title="Vastzetten"]').first();
  await lockButton.click();
  await expect(
    page.getByRole("button", { name: "Segment ontgrendelen" }).first(),
  ).toBeVisible();

  await page.getByRole("button", { name: "🔓 Slotjes wissen" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Alle slotjes zijn gewist",
  );
  await expect(
    page.getByRole("button", { name: "Segment ontgrendelen" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByRole("status")).toContainText("Filters zijn gereset");
  await expect(page.getByRole("button", { name: /Type:/ })).toContainText(
    "Product",
  );
  await expect(challengeHeading(page)).toContainText("Ontwerp een");
});

test("mobiele basisweergave blijft bruikbaar zonder horizontale overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);

  await expect(
    page.getByRole("button", { name: "↻ Nieuwe uitdaging" }),
  ).toBeVisible();
  await expect(challengeHeading(page)).toContainText("Ontwerp een");
  await expect(
    page.getByRole("button", { name: /Kies werkvorm/ }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
