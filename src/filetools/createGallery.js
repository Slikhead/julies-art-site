import fs from "fs";
import path from "path";

// 🧭 Root paths (two levels up from /src/filetools)
const ROOT = path.resolve(path.join("..", ".."));
const COMPONENTS = path.join(ROOT, "src", "components");
const ARTWORKS = path.join(ROOT, "src", "assets", "artworks");
const CAPTIONS = path.join(ROOT, "src", "data", "shop-captions");
const DESCRIPTIONS = path.join(ROOT, "src", "data", "shop-descriptions");
const SERIES_DESCRIPTIONS = path.join(ROOT, "src", "data", "series-descriptions");


// 🛠️ Ensure directories exist
  [COMPONENTS, ARTWORKS, CAPTIONS, DESCRIPTIONS, SERIES_DESCRIPTIONS].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 🧩 Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  console.log("\n🎨 Julie's Art — Gallery Creator\n");

  const galleryName = (await ask("Enter the new gallery name (e.g. florals): ")).trim();
  if (!galleryName) {
    console.error("❌ Gallery name is required.");
    rl.close();
    return;
  }

  const title = galleryName.charAt(0).toUpperCase() + galleryName.slice(1);
  const basePath = `artworks/${galleryName}`;

  const description = await ask(
    "\nEnter a short description for this gallery (2–3 sentences):\n> "
  );

  const caption = await ask(
    "\nEnter a sample caption for an artwork in this gallery:\n> "
  );

  // 🖼️ Create folders
  const galleryFolder = path.join(ARTWORKS, galleryName);
  if (!fs.existsSync(galleryFolder)) fs.mkdirSync(galleryFolder, { recursive: true });

  // 🧾 Description file
  const descFile = path.join(DESCRIPTIONS, `${galleryName}.txt`);
  fs.writeFileSync(descFile, description || `Description for ${title}`);

  // 💬 Caption file
  const capFile = path.join(CAPTIONS, `${galleryName}-sample.txt`);
  fs.writeFileSync(capFile, caption || `${title} sample artwork caption.`);

  // ✏️ Create corresponding series-description file
const seriesDescriptionFile = path.join(SERIES_DESCRIPTIONS, `${galleryName}.txt`);
if (!fs.existsSync(seriesDescriptionFile)) {
  fs.writeFileSync(
    seriesDescriptionFile,
    `# ${galleryName}\nThis series celebrates the beauty and uniqueness of ${galleryName}.\n`
  );
  console.log(`📝 Created series description: ${seriesDescriptionFile}`);
} else {
  console.log(`ℹ️ Series description already exists: ${seriesDescriptionFile}`);
}


  // ⚛️ Component file
  const componentPath = path.join(COMPONENTS, `${title}.jsx`);
  if (!fs.existsSync(componentPath)) {
    const componentCode = `import ShopGallery from "./ShopGallery";

export default function ${title}() {
  return (
    <ShopGallery
      basePath="${basePath}"
      title="${title}"
    />
  );
}
`;
    fs.writeFileSync(componentPath, componentCode);
  }

  console.log(`
✅ Created new gallery: ${title}

📁 Folder: ${galleryFolder}
📝 Description: ${descFile}
💬 Caption: ${capFile}
⚛️ Component: ${componentPath}

👉 Next: Add images to "${galleryFolder}/"
Then run "npm run dev" and view it via /${galleryName.toLowerCase()}
`);

  rl.close();
})();
