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
        .catch(error => res.status(500).send(error));
})
app.get('/', (req, res) => {
    res.send(`
    <div class="postman-run-button"
    data-postman-action="collection/import"
    data-postman-var-1="a4a336aa97ebdc262a49"></div>
    <script type="text/javascript">
        (function (p,o,s,t,m,a,n) {
            !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
            !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
            (n = o.createElement("script")),
            (n.id = s+t), (n.async = 1), (n.src = m), n
            ));
        }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
    </script>
    `)
})
app.get('/balance', (req, res) => {
    bank.getBalance({
        account: req.query.account
    })
        .then((result) => res.status(200).send(result[0]))
})
app.get('/transactions', (req, res) => {
    bank.getTransactions({})
        .then(result => res.json(result))
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
})