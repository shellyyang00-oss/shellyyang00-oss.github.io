// Optional artwork task: run with Node.js and the sharp package installed.
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const portrait = fs
  .readFileSync(path.join(root, "assets/img/profile.jpg"))
  .toString("base64");
const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><clipPath id="portrait"><path d="M814 272a153 153 0 0 1 306 0v264H814Z"/></clipPath></defs>
  <rect width="1200" height="630" fill="#f8f7f3"/>
  <path d="M70 84h1060M70 555h1060" stroke="#d4dece"/>
  <text x="70" y="58" fill="#356153" font-family="Arial,sans-serif" font-size="15" letter-spacing="3">BIOENGINEERING · UNIVERSITY OF PENNSYLVANIA</text>
  <text x="70" y="213" fill="#203b36" font-family="Georgia,serif" font-size="66">Xiaoqiu Yang</text>
  <text x="72" y="274" fill="#3c6957" font-family="Georgia,serif" font-style="italic" font-size="44">Shelly</text>
  <text x="73" y="332" fill="#203b36" font-family="Arial,sans-serif" font-size="21">Ph.D. student in Bioengineering</text>
  <text x="73" y="399" fill="#50614f" font-family="Georgia,serif" font-size="29">Mechanical forces. Cellular signals.</text>
  <text x="73" y="438" fill="#50614f" font-family="Georgia,serif" font-size="29">Heart valve disease.</text>
  <path d="M826 267a153 153 0 0 1 306 0v256" fill="none" stroke="#b8c9af"/>
  <image href="data:image/jpeg;base64,${portrait}" x="783" y="118" width="368" height="420" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>
  <text x="72" y="594" fill="#526b53" font-family="Arial,sans-serif" font-size="16">shellyyang00-oss.github.io</text>
  <text x="1130" y="594" text-anchor="end" fill="#526b53" font-family="Arial,sans-serif" font-size="14">RESEARCH / PUBLICATIONS / EXPERIENCE</text>
</svg>`;
sharp(Buffer.from(artwork))
  .png()
  .toFile(path.join(root, "assets/img/og.png"))
  .then(() => console.log("Rendered 1200 × 630 social sharing image."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
