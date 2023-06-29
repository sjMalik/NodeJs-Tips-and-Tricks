# Contents
1. [Ddos/Brute Force Attcack and Prevent in Nodejs](#ddosbrute-force-attcack-and-prevent-in-nodejs)
2. [How do you secure the API?](#how-do-you-secure-the-api)
3. [SSL Certificate, Generate Locally and Use in Node Server](#what-is-an-ssl-certificate)
4. [Express File Upload](#file-upload)
5. [Scaffolding Express Project](#scaffolding-node-express-project)

## [Ddos/Brute Force Attcack and Prevent in Nodejs](https://www.youtube.com/watch?v=TtPsUq09OZU&list=PLdHg5T0SNpN2c0j8ggRFUU4iRxVznozWt&index=1&ab_channel=MafiaCodes)
In a DDoS attack, the attacker tries to make a particular service unavailable by directing continuous and huge traffic from multiple end systems. Due to this enormous traffic, the network resources get utilized in serving requests of those false end systems such that, a legitimate user is unable to access the resources for himself/herself. 

Distributed Denial of Service (DDoS) is a type of DOS attack where multiple systems, which are trojan infected, target a particular system which causes a DoS attack. 

A DDoS attack uses multiple servers and Internet connections to flood the targeted resource.

- [Reference 1](https://www.geeksforgeeks.org/denial-of-service-ddos-attack/)
- [Reference 2](https://www.geeksforgeeks.org/what-is-ddosdistributed-denial-of-service/)

## [How do you secure the API?](https://github.com/sjMalik/interview-question-answers/blob/main/NodeJS.md#how-do-you-secure-the-api)
Captcha/Re-Captcha
- Works great on login/register forms
- API access cant be blocked/limited

Rate Limiter/Incremental Delay/Request Throttling

[⬆️ Back to Contents](#contents)

## [What is an SSL certificate?](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/)
SSL, more commonly called TLS, is a protocol for encrypting Internet traffic and verifying server identity.

SSL certificates are what enable websites to use HTTPS, which is more secure than HTTP. An SSL certificate is a data file hosted in a website's origin server. SSL certificates make SSL/TLS encryption possible, and they contain the website's public key and the website's identity, along with related information. Devices attempting to communicate with the origin server will reference this file to obtain the public key and verify the server's identity. The private key is kept secret and secure.

Steps to SSL cert generation. Run the below commands
1. Generate Private Key
    ```
    mkdir cert; cd cert;
    openssl genrsa -out key.pem
    ```
2. Generate a CSR(certificate sigining request) by using private key
    ```
    openssl req -new -key key.pem -out csr.pem
    ```
2. Generate the SSL certification from CSR
    x509 is the standard defining the format of public key certificate
    valid for 365 days
    ```
    openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
    ```

Use the certificate in Node server
```
const sslServer = http.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
});

sslServer.listen(3443, ()=> console.log('Secure server 🚀🔐 listening on port 3443'));
```

[⬆️ Back to Contents](#contents)

## [File Upload](https://www.npmjs.com/package/express-fileupload)
Dont save the file with the name which user send, there may be case that two different file has same name and in this case the old file will be overwritten.
file instance
```
{
  name: 'CRUD Swagger APIs.png',
  data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 67 00 00 03 10 08 06 00 00 00 13 b5 6e 9e 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 70918 more bytes>,
  size: 70968,
  encoding: '7bit',
  tempFilePath: '', // Store the file temporarily
  truncated: false, // It will be true if there is limit of file size
  mimetype: 'image/png',
  md5: 'fe3e7187a7202484726f8111d2f48db7',
  mv: [Function: mv]
}
```

Using useTempFile Options: 
Use temp files instead of memory for managing the upload process.
```
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
```

createParentPath: 
Automatically creates the directory path specified in .mv(filePathName)
```
app.use(fileUpload({
    createParentPath : true,
}));
```
50 mb limit
```
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
```

## [Response Compression](https://www.npmjs.com/package/compression)
* level - The level of zlib compression to apply to responses. A higher level will result in better compression, but will take longer to complete. A lower level will result in less compression, but will be much faster.
* threshold - The byte threshold for the response body size before compression is considered for the response, defaults to 1kb. This is a number of bytes or any string accepted by the bytes module.
* filter the compression based on condition
```
app.use(compression({
    level: 6,
    threshold: 100 * 1024,
    filter: (req, res)=> {
        if(req.headers['x-no-compression']){
            return false;
        }
        return compression.filter(req, res)
    }
}))
```

## [HTTP Cookies](https://www.geeksforgeeks.org/http-cookies/)
Cookie in simpler terms means just the textual information about some website. When you visit a particular website, some information is saved in your local system so that when you visit the same website again, this website is able to recognize you and show you the results according to your preferences. Cookies have been long used in the internet history and have developed in a magnificent way. 

When you visit a website you actually requests the web page from the server. For a server, every request is a unique request. So if you visit hundred times, the server will consider each and every request unique. Since the intensity of requests that arrive at a server is high, it is obvious and logical not to store every user’s information to the server. Maybe you never visit again and the same information will be redundant. So, to uniquely remember you, the server sends the cookies along with the response which is saved in your local machine. Now the next time you hit the same server, you will get a response according to you as the server will recognize you.

[Other Reference](https://github.com/sjMalik/node-express-postgres-auth#authentication)

### cookie-parser
This module is used for handling the cookies

---

**Cookie Helper**

```
const cookieParser = require('cookie-parser')

app.get('/set-cookie', (req, res)=> {
    res.cookie('foo', 'bar', {
        maxAge: 5000,   // the cookie valid for 5 sec
        expires: new Date('1st January 2100'),
        httpOnly: true,
        secure: true,
        domain: 'example.com'
    })
});
```

- **`httponly`**

  > When this attribute is set, client-side scripts(e.g. document.cookies() etc.) are not allowed to access the cookie. Now, the question that arises is, 'Why do I need to safeguard my cookies from client-side scripts?'
  > <br><br> _The short answer_: **XSS** <br> _The long answer_: Cross Site Scripting attacks can be used to steal cookies with the help of client-side scripts.
  > <br><br>
  > Restricting access to cookies by client-side scripts does not completely mitigate the risk of stealing cookies via XSS. However, it does raise the bar considerably and ensures that the most common XSS attack is mitigated, though not completely.

- **`secure`**

  > The _Secure_ attribute makes sure that the cookie will only be sent with requests made over an encrypted connection and an attacker won't be able to steal cookies by sniffing. If this flag is true then you can set cookie only if you have https connection

- **`maxAge`**

  > This attribute is used to set persistent cookies. It signifies how long the browser should use the persistent cookie and when the cookie should be deleted.
  > <br><br>
  > If this attribute is not specified, then the lifetime of the cookie is the same as that of browser session, i.e. it will be a non-persistent cookie.

- **`expires`**

  > Same as `maxAge`, but expiration date is provided instead of time to expire.

- **`domain`**

  > The _domain_ attribute signifies the domain for which the cookie is valid and can be submitted with every request for this domain or its subdomains. If this attribute is not specified, then the hostname of the originating server is used as the default value.

- **`path`**
  > The _path_ attribute signifies the URL or path for which the cookie is valid. The default path attribute is set as '/'.

---

## Scaffolding node-express project
1. mkdir express-template; cd express-template
2. express
3. run `SET DEBUG=express-template:* & npm start`
4. gitignore node
5. Convert Express App to JSON API
    - Remove view rendering
    - Remove the routes folder
    - Remove static serve and public folder
    - Update error handler in `app.js`
    ```
        // error handler
        app.use((err, req, res) => {
            // render the error page
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: req.app.get('env') === 'development' ? err : {},
            });
        });
    ```
6. structure
    ```
    server
        |- api
        |---|- router file
        |- db
        |---|- connection and queries
        |- lib
        |---|- validation and error handler
    ```
7. Set eslinter in your node project
    - Step 1. Add eslint npm package as a development dependency.
        ```
        npm install eslint --save-dev
        ```
    - Step 2. Run eslint init and follow the wizard
        ```
        ./node_modules/.bin/eslint --init
        ```
    - Step 3. Add npm scripts
        ```
        "lint": "eslint .  --ext .js",
        "lint-fix": "eslint --fix .  --ext .js"
        ```
    - lint or fix
        ```
        npm run lint
        npm run lint-fix
        ```

## VS Code Shortcuts
1. To generate a skeleton of HTML press ! and enter

