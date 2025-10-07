const http = require('http');
const httpProxy = require('http-proxy');

const target = 'http://127.0.0.1:1111';
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

proxy.on('error', (err, req, res) => {
  if (req.url === '/api') {
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify({ status: 'starting' }));
  } else {
    res.writeHead(502, {'content-type':'text/plain'});
    res.end('upstream not ready');
  }
});

http
  .createServer((req, res) => proxy.web(req, res, { target }))
  .listen(process.env.PORT || 8080, '0.0.0.0', () => {
    console.log('Proxy listening on', process.env.PORT || 8080, '→', target);
  });
