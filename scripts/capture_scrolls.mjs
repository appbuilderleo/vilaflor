import { spawn } from 'node:child_process';
import fs from 'node:fs';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(browser, [
  '--headless',
  '--remote-debugging-port=9225',
  '--user-data-dir=e:\\Art DPIC\\projectos\\vilaflor\\.chrome-tmp-scrolls',
  '--window-size=1440,900'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9225/json/list');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    const scrollTargets = [
      { name: 'house', y: 1050 },
      { name: 'accommodation', y: 2000 },
      { name: 'experiences', y: 3100 },
      { name: 'gallery', y: 4400 },
      { name: 'location', y: 6200 },
      { name: 'reputation', y: 7200 }
    ];

    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.navigate',
        params: { url: 'http://127.0.0.1:3000/index.html' }
      }));
    };

    let idx = 0;
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === 1) {
        setTimeout(doNextScroll, 1200);
      } else if (data.id === 10) {
        // Scrolled, now take screenshot
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 20 + idx,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 400);
      } else if (data.id >= 20 && data.id < 30) {
        const item = scrollTargets[idx];
        const outPath = `e:\\Art DPIC\\projectos\\vilaflor\\scroll-${item.name}.png`;
        fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
        console.log(`Saved ${outPath}`);
        idx++;
        if (idx < scrollTargets.length) {
          doNextScroll();
        } else {
          ws.close();
          proc.kill();
          console.log('All sections captured successfully!');
          process.exit(0);
        }
      }
    };

    function doNextScroll() {
      const item = scrollTargets[idx];
      ws.send(JSON.stringify({
        id: 10,
        method: 'Runtime.evaluate',
        params: {
          expression: `window.scrollTo(0, ${item.y});`
        }
      }));
    }
  } catch (e) {
    console.error('Error:', e);
    proc.kill();
  }
}, 1500);

