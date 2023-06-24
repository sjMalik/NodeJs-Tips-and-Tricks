const experss = require('express');
const cookieParser = require('cookie-parser');

const app = experss();
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send('Hello 🍪')
});

app.get('/set-cookie', (req, res)=> {
    res.cookie('foo', 'bar', {
        maxAge: 50000,   // the cookie valid for 5 sec
        expires: new Date('1st January 2100'),
        httpOnly: true,
        // secure: true,
        // domain: 'example.com'
    });

    res.send('Cookie set')
});

app.get('/get-cookie', (req, res)=> {
    res.send(req.cookies)
})

app.get('/delete-cookie', (req, res)=> {
    res.clearCookie('foo');
    res.send('Cookie has been deleted')
})

app.listen(3000, ()=> console.log('🍪 serve running on port 3000'))

