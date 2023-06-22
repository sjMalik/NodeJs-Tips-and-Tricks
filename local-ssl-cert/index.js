const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();

app.use('/', (req, res, next)=> {
    res.send('Hello from SSL server')
});

const sslServer = http.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

sslServer.listen(3443, ()=> console.log('Secure server 🚀🔐 listening on port 3443'));