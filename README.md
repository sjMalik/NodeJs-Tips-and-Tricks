# Contents
1. [Ddos/Brute Force Attcack and Prevent in Nodejs](#ddosbrute-force-attcack-and-prevent-in-nodejs)
2. [How do you secure the API?](#how-do-you-secure-the-api)
3. [SSL Certificate, Generate Locally and Use in Node Server](#what-is-an-ssl-certificate)

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

[Back to Contents ⬆️](#contents)

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

[Back to Contents ⬆️](#contents)

