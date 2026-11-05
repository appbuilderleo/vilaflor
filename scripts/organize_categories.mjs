import fs from 'node:fs';
import path from 'node:path';

const inventory = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/classified_inventory.json', 'utf-8'));
const baseDir = 'e:/Art DPIC/projectos/vilaflor/public/images/vila-flor';
const origDir = path.join(baseDir, 'original');

// Define friendly names and categories
const categoryMap = {
  'exterior': 'exterior-architecture',
  'living-room': 'living-room',
  'bedrooms': 'bedrooms',
  'bathrooms': 'bathrooms',
  'kitchen': 'kitchen',
  'swimming-pool': 'swimming-pool',
  'beach-ocean': 'beach-ocean',
  'garden-outdoor': 'garden-outdoor',
  'details': 'details'
};

const categorizedList = [];

// Fine tune specific photos into garden-outdoor / beach-ocean if appropriate
for (const item of inventory) {
  let cat = item.category;
  let label = item.label;
  let slug = '';

  if (item.uuid === 'abdbcc61-943a-4a4a-ad0e-b92cc25fea65') {
    cat = 'exterior';
    slug = 'colonial-house-veranda-facade';
  } else if (item.uuid === 'a6a4238a-4d18-4bac-8bfb-90808777de0c') {
    cat = 'exterior';
    slug = 'ocean-deck-beachfront-view';
  } else if (item.uuid === '6beda046-cafc-489c-bc52-055221e78b44') {
    cat = 'living-room';
    slug = 'living-room-main-colonial-lounge';
  } else if (item.uuid === 'e817fc11-1b45-4611-9e3b-de37429fba8a') {
    cat = 'exterior';
    slug = 'beachfront-colonial-estate-lawn';
  } else if (item.uuid === 'd73676f9-d799-4fe0-8533-b14e2fd6974a') {
    cat = 'swimming-pool';
    slug = 'private-swimming-pool-and-sundeck';
  } else if (item.uuid === '095d7a3d-d8bb-4350-a04e-41495d5619a1') {
    cat = 'details';
    slug = 'interior-styling-and-coastal-details';
  } else if (item.uuid === '2603d663-b04b-42da-92c6-797fc68716ee') {
    cat = 'garden-outdoor';
    slug = 'tropical-gardens-outdoor-walkway';
  } else if (item.uuid === 'e061a571-d19c-4874-b3d9-9ddae2710c91') {
    cat = 'beach-ocean';
    slug = 'direct-beach-access-path';
  } else if (item.uuid === '0376d8e4-399e-474d-9e86-d2b41f5f4af8') {
    cat = 'living-room';
    slug = 'living-room-reading-nook';
  } else if (item.uuid === '18b6f1f1-e69c-4b65-b878-66f0a3f72144') {
    cat = 'living-room';
    slug = 'living-room-dining-integration';
  } else if (item.uuid === '7f9d0c5e-34a7-4c5d-872b-ea18cac5cd92') {
    cat = 'living-room';
    slug = 'living-room-coastal-furnishings';
  } else if (item.uuid === '5ed2e425-429c-4294-b97c-bbe34a127c20') {
    cat = 'living-room';
    slug = 'living-room-spacious-interior';
  } else if (item.uuid === '4c1a36f9-11a4-4f7e-b44a-e5e548f7e9dd') {
    cat = 'living-room';
    slug = 'living-room-natural-light';
  } else if (item.uuid === '261fadd3-3ab8-4a7c-9592-bab28c3c9d7c') {
    cat = 'living-room';
    slug = 'living-room-architectural-timber';
  } else if (item.uuid === '517c45b8-99ad-4afd-99ef-0ab65ad5cba2') {
    cat = 'living-room';
    slug = 'living-room-veranda-connection';
  } else if (item.uuid === 'c1e612c7-0f20-406a-8ac9-de2c1f989fc3') {
    cat = 'kitchen';
    slug = 'kitchen-fully-equipped-prep-counter';
  } else if (item.uuid === '7e452444-3592-4e00-8ba8-5dfd3fbbf728') {
    cat = 'kitchen';
    slug = 'kitchen-appliances-and-cabinetry';
  } else if (item.uuid === 'e1d585bc-7ab6-4c7d-8842-043618b12601') {
    cat = 'bedrooms';
    slug = 'bedroom-1-master-queen-bed';
  } else if (item.uuid === '10a3128a-3b7e-4a29-9afc-f91fc9d83eb1') {
    cat = 'bedrooms';
    slug = 'bedroom-1-queen-side-view';
  } else if (item.uuid === 'e01b4370-68b3-44ac-8444-c7b30d0525be') {
    cat = 'bedrooms';
    slug = 'bedroom-2-king-bed-suite';
  } else if (item.uuid === 'e733e03b-5de7-4a0b-842f-ac1e501f5d67') {
    cat = 'bedrooms';
    slug = 'bedroom-2-king-bed-detail';
  } else if (item.uuid === 'dd768528-9089-4645-b7a7-4cd4b9d1cd4a') {
    cat = 'bedrooms';
    slug = 'bedroom-2-wardrobe-and-window';
  } else if (item.uuid === 'b37c138c-141f-480d-b791-d69087a6ca89') {
    cat = 'bedrooms';
    slug = 'bedroom-3-two-twin-beds';
  } else if (item.uuid === '9e2c6dc3-e139-4ad3-8a76-e5f34c4d3f64') {
    cat = 'bedrooms';
    slug = 'bedroom-3-twin-beds-perspective';
  } else if (item.uuid === 'df6e840e-a4d4-4a6a-870a-2c48e6406ace') {
    cat = 'bedrooms';
    slug = 'bedroom-3-decor-and-storage';
  } else if (item.uuid === '4277c4d2-0b7a-452f-9878-416dd2cac9b7') {
    cat = 'bedrooms';
    slug = 'bedroom-4-two-twin-beds-main';
  } else if (item.uuid === 'b249d396-87f8-4ab3-9a37-c061ee44d3dd') {
    cat = 'bedrooms';
    slug = 'bedroom-4-twin-beds-view-2';
  } else if (item.uuid === 'd1f278fd-8231-4bdd-b1f2-861f1aa764d0') {
    cat = 'bedrooms';
    slug = 'bedroom-4-garden-view';
  } else if (item.uuid === '4d450a39-4714-43cb-bc99-88f84bdd40ca') {
    cat = 'bedrooms';
    slug = 'bedroom-4-linen-and-details';
  } else if (item.uuid === '43635c59-e0f3-40cf-aa17-b4a502ac33b1') {
    cat = 'bathrooms';
    slug = 'bathroom-1-vanity-and-mirror';
  } else if (item.uuid === '9b8039dd-ebb0-4f2f-9862-6d710e2d0220') {
    cat = 'bathrooms';
    slug = 'bathroom-1-walk-in-shower';
  } else if (item.uuid === '74b7e77b-341d-4bdc-8da9-8c3f7234cd69') {
    cat = 'bathrooms';
    slug = 'bathroom-2-walk-in-shower-and-basin';
  } else if (item.uuid === 'd47a3bc8-13e7-4468-b88f-88908129d605') {
    cat = 'bathrooms';
    slug = 'bathroom-3-modern-suite';
  } else if (item.uuid === 'd79fe48f-b62f-4aa2-a304-526aa8d20d40') {
    cat = 'beach-ocean';
    slug = 'beach-picnic-and-coastal-setup';
  } else if (item.uuid === '3359eada-61b0-4a1f-a78c-dbde8cb8a64d') {
    cat = 'exterior';
    slug = 'veranda-seating-and-architecture';
  } else if (item.uuid === '41c4adab-b112-4db5-9932-ba92bd213d84') {
    cat = 'exterior';
    slug = 'beachfront-lawn-and-coastal-trees';
  } else if (item.uuid === '532662d8-9b98-4ed1-84a5-abad888b5132') {
    cat = 'garden-outdoor';
    slug = 'lush-tropical-gardens-property';
  } else if (item.uuid === '602b0a36-2316-4a60-914e-344a0cb0c6d4') {
    cat = 'garden-outdoor';
    slug = 'outdoor-relaxation-area';
  } else if (item.uuid === '209f8278-04f4-426b-a07b-b86478e1042a') {
    cat = 'exterior';
    slug = 'property-entrance-colonial-veranda';
  } else if (item.uuid === '998c9503-afbb-42b8-a811-9710fda3645c') {
    cat = 'exterior';
    slug = 'aerial-beachfront-setting';
  } else if (item.uuid === '07f17107-31fd-4d81-8dac-6913871129b1') {
    cat = 'details';
    slug = 'architectural-craftsmanship';
  } else if (item.uuid === '0a72d8fb-5de0-4f9e-8527-892e1a333402') {
    cat = 'details';
    slug = 'hospitality-touches-and-decor';
  } else {
    slug = `vila-flor-${cat}-${item.index}`;
  }

  const categoryFolder = path.join(baseDir, cat);
  fs.mkdirSync(categoryFolder, { recursive: true });

  const targetFilename = `${String(item.index).padStart(2, '0')}-${slug}.jpeg`;
  const targetPath = path.join(categoryFolder, targetFilename);
  const srcPath = path.join(origDir, item.file);

  fs.copyFileSync(srcPath, targetPath);

  categorizedList.push({
    index: item.index,
    uuid: item.uuid,
    category: cat,
    label: item.label,
    slug,
    filename: targetFilename,
    relPath: `public/images/vila-flor/${cat}/${targetFilename}`,
    webPath: `images/vila-flor/${cat}/${targetFilename}`,
    originalFile: item.file,
    width: item.width,
    height: item.height,
    orientation: item.orientation,
    bytes: item.bytes
  });
}

fs.writeFileSync(path.join(baseDir, 'inventory.json'), JSON.stringify(categorizedList, null, 2), 'utf-8');
console.log('Saved organized inventory.json with', categorizedList.length, 'photos.');

// Also create a Markdown inventory
let md = `# VILA FLOR — OFFICIAL PHOTOGRAPH INVENTORY\n\n`;
md += `Retrieved from official Airbnb listing: https://www.airbnb.com.br/rooms/1133096153786064159\n`;
md += `Total Verified Original Photographs: ${categorizedList.length}\n\n`;

const categories = [...new Set(categorizedList.map(c => c.category))];
for (const cat of categories) {
  md += `## Category: ${cat.toUpperCase()}\n\n`;
  md += `| # | Photo Name | Dimensions | Orientation | Description / Caption | Web Path |\n`;
  md += `|---|------------|------------|-------------|-----------------------|----------|\n`;
  for (const it of categorizedList.filter(c => c.category === cat)) {
    md += `| ${it.index} | \`${it.filename}\` | ${it.width}x${it.height} | ${it.orientation} | ${it.label} | \`${it.webPath}\` |\n`;
  }
  md += `\n`;
}

fs.writeFileSync(path.join(baseDir, 'INVENTORY.md'), md, 'utf-8');
fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/IMAGE_INVENTORY.md', md, 'utf-8');
console.log('Saved INVENTORY.md');

