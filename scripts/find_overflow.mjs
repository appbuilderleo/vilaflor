import { spawn } from 'node:child_process';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(browser, [
  '--headless',
  '--remote-debugging-port=9222',
  '--user-data-dir=e:\\Art DPIC\\projectos\\vilaflor\\.chrome-tmp',
  '--window-size=375,812'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;
    console.log('Connected to Chrome tab:', wsUrl);

    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      // Navigate to site
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.navigate',
        params: { url: 'http://127.0.0.1:3000/index.html' }
      }));
    };

    ws.onmessage = async (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === 1) {
        // wait 1s for load
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                (() => {
                  const items = [];
                  document.querySelectorAll('*').forEach(el => {
                    if (el.scrollWidth > 375) {
                      items.push({
                        tag: el.tagName,
                        className: (el.className || '').toString(),
                        id: el.id,
                        scrollWidth: el.scrollWidth,
                        offsetWidth: el.offsetWidth
                      });
                    }
                  });
                  return JSON.stringify(items);
                })()
              `
            }
          }));
        }, 1200);
      } else if (data.id === 2) {
        console.log('Overflowing elements:');
        const items = JSON.parse(data.result.result.value);
        console.log(items);
        ws.close();
        proc.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Error:', err);
    proc.kill();
  }
}, 1000);

