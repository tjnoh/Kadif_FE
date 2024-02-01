const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const certsDir = 'C:\\Users\\User\\certs';

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync(path.resolve('./certs/privKey.pem')),
    cert: fs.readFileSync(path.resolve('./certs/cert.pem')),
  };

  createServer(options, async (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://172.31.168.112:3000');
  });
});
