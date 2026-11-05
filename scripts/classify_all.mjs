import fs from 'node:fs';

const html = fs.readFileSync('e:/Art DPIC/projectos/vilaflor/airbnb.html', 'utf-8');
const files = JSON.parse(fs.readFileSync('e:/Art DPIC/projectos/vilaflor/photo_snippets.json', 'utf-8'));

const fullInventory = [];

for (let i = 0; i < files.length; i++) {
  const item = files[i];
  const uuid = item.uuid;
  
  // Search for accessibilityLabel around uuid
  let label = '';
  let pos = 0;
  while ((pos = html.indexOf(uuid, pos)) !== -1) {
    const chunk = html.slice(Math.max(0, pos - 300), Math.min(html.length, pos + 300));
    const m = chunk.match(/"accessibilityLabel":"([^"]+)"/);
    if (m) {
      label = m[1];
      break;
    }
    const m2 = chunk.match(/alt="([^"]+)"/);
    if (m2 && !m2[1].includes('http')) {
      label = m2[1];
      break;
    }
    pos += uuid.length;
  }

  // If still not found, check if it's the hero / main photo
  if (!label) {
    if (uuid === 'abdbcc61-943a-4a4a-ad0e-b92cc25fea65') label = 'Vila Flor - Fachada Colonial e Varanda Tropical';
    else if (uuid === 'a6a4238a-4d18-4bac-8bfb-90808777de0c') label = 'Vila Flor - Vista Panorâmica do Oceano e Deck';
    else if (uuid === '6beda046-cafc-489c-bc52-055221e78b44') label = 'Imagem 1 de Sala de estar - Living Room Principal';
    else if (uuid === 'e817fc11-1b45-4611-9e3b-de37429fba8a') label = 'Imagem 1 de Exterior - Casa de Praia e Gramado';
    else if (uuid === 'd73676f9-d799-4fe0-8533-b14e2fd6974a') label = 'Imagem 1 de Piscina - Piscina Privativa e Oceano';
    else if (uuid === '095d7a3d-d8bb-4350-a04e-41495d5619a1') label = 'Imagem 3 de Fotos adicionais - Detalhes Arquitetônicos';
    else if (uuid === '2603d663-b04b-42da-92c6-797fc68716ee') label = 'Imagem 10 de Exterior - Vista dos Jardins e Praia';
    else if (uuid === 'e061a571-d19c-4874-b3d9-9ddae2710c91') label = 'Imagem 8 de Exterior - Acesso Direto à Praia';
  }

  // Determine category based on label
  let category = 'details';
  const l = label.toLowerCase();
  if (l.includes('sala de estar') || l.includes('living')) category = 'living-room';
  else if (l.includes('quarto') || l.includes('bedroom')) category = 'bedrooms';
  else if (l.includes('cozinha') || l.includes('kitchen')) category = 'kitchen';
  else if (l.includes('banheiro') || l.includes('bathroom')) category = 'bathrooms';
  else if (l.includes('piscina') || l.includes('pool')) category = 'swimming-pool';
  else if (l.includes('piquenique') || l.includes('praia') || l.includes('oceano') || l.includes('beach')) category = 'beach-ocean';
  else if (l.includes('jardim') || l.includes('garden')) category = 'garden-outdoor';
  else if (l.includes('exterior') || l.includes('fachada') || l.includes('varanda')) category = 'exterior';
  else if (l.includes('adicionais')) category = 'details';

  fullInventory.push({
    index: i + 1,
    uuid,
    file: item.file,
    width: item.width,
    height: item.height,
    orientation: item.orientation,
    bytes: item.bytes,
    label,
    category
  });
}

console.log('Classified all 42 photos:');
const catCount = {};
for (const it of fullInventory) {
  catCount[it.category] = (catCount[it.category] || 0) + 1;
}
console.log('Category breakdown:', catCount);

fs.writeFileSync('e:/Art DPIC/projectos/vilaflor/classified_inventory.json', JSON.stringify(fullInventory, null, 2), 'utf-8');

