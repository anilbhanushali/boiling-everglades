const express = require('express')
const bodyParser = require('body-parser')
const bank = require('./app/bank')
const app = express()
app.use(bodyParser.json())
app.post('/transaction', (req, res) => {
    bank.transfer({
        from: req.body.from,
        to: req.body.to,
        amount: req.body.amount
    })
    .then(() => res.sendStatus(200))
    .catch(error=>res.status(500).send(error));
})
app.get('/balance', (req, res) => {
    bank.getBalance({
        account : req.query.account
    })
    .then((result) => res.status(200).send(result[0]))
})
app.get('/transactions',(req,res) => {
    bank.getTransactions({})
    .then(result=> res.json(result))
})
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})