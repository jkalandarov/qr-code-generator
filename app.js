const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const qrcode = require('qrcode')
const port = 4000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    qrcode.toDataURL('https://github.com/jkalandarov', (err, url) => {
        const data = {
            url: url
        }
        res.render('home', {data})
    })
})

app.post('/', (req, res) => {
    const text = req.body.input
    console.log(req.body);
    qrcode.toDataURL(text, (err, url) => {
        const data = {
            url: url
        }
        res.render('home', {data})
    })
})



app.listen(port, () =>{
    console.log(`Server started listening on port ${port}`);
})