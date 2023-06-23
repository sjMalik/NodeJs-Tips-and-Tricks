const express = require('express');
const fileUplaod = require('express-fileupload');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');

app.get('/', async(req, res, next)=> {
    res.render('index')
});

app.use(fileUplaod({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: { fileSize: 1 * 1024 * 1024 }   // 1 mb limit
}));

app.post('/single', async(req, res, next)=> {
    try{
        const file = req.files.mfile;
        // Creating a new file name to avoid duplication
        const filename = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join(__dirname, 'public', 'uploads', filename);
        if(file.truncated) {
            throw new Error('File size limit is 1 mb')
        }
        await file.mv(savePath);
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
});

app.post('/multiple', async (req, res, next)=> {
    try{
        const files = req.files.mfiles;

        // let promises = [];
        // files.forEach(file=> {
        //     const filename = new Date().getTime().toString() + path.extname(file.name);
        //     const savePath = path.join(__dirname, 'public', 'uploads', filename);
        //     promises.push(file.mv(savePath));
        // });

        const promises = files.map(file=> {
            const filename = new Date().getTime().toString() + path.extname(file.name);
            const savePath = path.join(__dirname, 'public', 'uploads', filename);
            return file.mv(savePath)
        })
        await Promise.all(promises);

        res.redirect('/')
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
})

app.listen(3000, ()=> console.log('🚀 running on port 3000'))