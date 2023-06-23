# Contents
1. [Ddos/Brute Force Attcack and Prevent in Nodejs](#ddosbrute-force-attcack-and-prevent-in-nodejs)
2. [How do you secure the API?](#how-do-you-secure-the-api)
3. [SSL Certificate, Generate Locally and Use in Node Server](#what-is-an-ssl-certificate)
4. [Express File Upload](#file-upload)

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

## VS Code Shortcuts
1. To generate a skeleton of HTML press ! and enter

