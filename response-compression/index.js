const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression({
    level: 6,   // value 6 is the best compression level to optimize the cpu
    threshold: 100 * 1024,
    filter: (req, res)=> {
        if(req.headers['x-no-compression']){
            return false;
        }
        return compression.filter(req, res)
    }
}))

app.get('/', (req, res)=> {
    const payload = 'Faster app which uses less bandwidth ...';
    res.send(payload.repeat(10000))
});

app.listen(3000, ()=> console.log('🚀 running at port 3000'))