const { spawn, exec } = require('child_process');
const http = require('http');

const PORT = 3000;
const WEBSITE_URL = `http://localhost:${PORT}`;
const CRM_URL = `http://localhost:${PORT}/crm`;
let opened = false;

const dev =
  process.platform === 'win32'
    ? spawn('cmd.exe', ['/c', 'npm run dev'], { stdio: 'inherit' })
    : spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

const openUrl = (url) => {
  if (process.platform === 'win32') {
    exec(`cmd /c start "" "${url}"`);
    return;
  }

  if (process.platform === 'darwin') {
    exec(`open "${url}"`);
    return;
  }

  exec(`xdg-open "${url}"`);
};

const checkServerReady = () => {
  if (opened) return;

  const req = http.get(WEBSITE_URL, (res) => {
    res.resume();
    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
      opened = true;
      openUrl(WEBSITE_URL);
      openUrl(CRM_URL);
      return;
    }

    setTimeout(checkServerReady, 1000);
  });

  req.on('error', () => {
    setTimeout(checkServerReady, 1000);
  });
};

setTimeout(checkServerReady, 1500);

dev.on('exit', (code) => {
  process.exit(code ?? 0);
});
