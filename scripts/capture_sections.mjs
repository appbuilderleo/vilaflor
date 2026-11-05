import { spawn } from 'node:child_process';
import fs from 'node:fs';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(browser, [
  '--headless',
  '--remote-debugging-port=9223',
  '--user-data-dir=e:\\Art DPIC\\projectos\\vilaflor\\.chrome-tmp-audit',
  '--window-size=1440,900'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    const sections = ['#a-casa', '#acomodacoes', '#experiencias', '#galeria', '#localizacao', '#avaliacoes'];

    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.navigate',
        params: { url: 'http://127.0.0.1:3000/index.html' }
      }));
    };

    let step = 0;
    ws.onmessage = async (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === 1) {
        setTimeout(captureNextSection, 1000);
      } else if (data.id >= 10 && data.id < 20) {
        const base64 = data.result.data;
        const filename = `e:\\Art DPIC\\projectos\\vilaflor\\section-${sections[step].slice(1)}.png`;
        fs.writeFileSync(filename, Buffer.from(base64, 'base64'));
        console.log(`Saved screenshot for ${sections[step]}`);
        step++;
        if (step < sections.length) {
          setTimeout(captureNextSection, 500);
        } else {
          ws.close();
          proc.kill();
          console.log('Finished section captures.');
          process.exit(0);
        }
      }
    };

    function captureNextSection() {
      const target = sections[step];
      ws.send(JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `document.querySelector('${target}').scrollIntoView({ behavior: 'instant' });`
        }
      }));
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 10 + step,
          method: 'Page.captureScreenshot',
          params: { format: 'png' }
        }));
      }, 300);
    }
  } catch (err) {
    console.error(err);
    proc.kill();
  }
}, 1000);

