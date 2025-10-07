const http = require('http');
const httpProxy = require('http-proxy');
const target = 'http://127.0.0.1:1111';
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });
http.createServer((req, res) => proxy.web(req, res)).listen(process.env.PORT || 8080, () => {
  console.log('Proxy listening on', process.env.PORT || 8080, '→', target);
});
