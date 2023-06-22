const express = require('express');
const app = express();

const rateLimiter = require('express-rate-limit');

// Apply rate limiting middleware to all the requests
// app.use(rateLimiter({
//     windowMs: 5 * 60 * 1000,
//     max: 2,
//     message: {
//         code: 429,
//         message: 'Too many requests'
//     }
// }));

app.get('/', (req, res)=> res.send('Hello from Rate limiter app'));

const loginLimitter = rateLimiter({
    windowMs: 1 * 60 * 1000,    // 5 min
    max: 2,                      // you can make max 2 requests in 5 mins
    message: {
        code: 429,
        message: 'Too many requests'
    }
});

app.post('/login', loginLimitter, (req, res)=> res.send('Login Successfull'));

const registerLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 2,
    message: {
        code: 429,
        message: 'Too many requests'
    }
})

app.post('/register', registerLimiter, (req, res)=> res.send('Registration Successfull'));

app.listen(3000, ()=> console.log(`rate limiter app running @ http://localhost:3000`))