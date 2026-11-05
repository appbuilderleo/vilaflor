import { execSync } from 'node:child_process';

const browser = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
  const wide = [];
  document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > 375) {
      wide.push({
        tag: el.tagName,
        cls: el.className,
        id: el.id,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth
      });
    }
  });
  console.log(JSON.stringify(wide.slice(0, 15)));
`;

// Let's run a test with chrome remote debugging or write a script to evaluate
console.log('Testing overflow...');

