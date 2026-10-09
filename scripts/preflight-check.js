const fs = require("fs");
const path = require("path");

const riders = fs.readFileSync("src/data/riders.ts", "utf8");
const partners = fs.readFileSync("src/data/partners.ts", "utf8");

const imgs = [...riders.matchAll(/imageSrc:\s*"([^"]+)"/g)].map((m) => m[1]);
const logos = [...partners.matchAll(/logoSrc:\s*"([^"]+)"/g)].map((m) => m[1]);

const prestige = imgs.filter((p) => p.includes("pilotes_prestige"));
const missing = [];

for (const p of [...prestige, ...logos]) {
  const full = path.join("public", p.replace(/^\//, ""));
  if (!fs.existsSync(full)) missing.push(p);
}

console.log(
  JSON.stringify(
    {
      missing,
      prestigeCount: prestige.length,
      partnerCount: logos.length,
      billetterie: fs.existsSync("src/app/billetterie/page.tsx"),
      oldBilleterie: fs.existsSync("src/app/billeterie"),
      contactApi: fs.existsSync("src/app/api/contact"),
      aleksander: fs.existsSync(
        "public/images/pilotes_prestige/Aleksander.webp"
      ),
      mx24: fs.existsSync("public/images/partners/24MxLogo.png"),
      favicon: fs.existsSync("public/favicon.ico"),
      legal: [
        fs.existsSync("src/app/mentions-legales/page.tsx"),
        fs.existsSync("src/app/confidentialite/page.tsx"),
      ],
    },
    null,
    2
  )
);
