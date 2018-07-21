/*
TABLE transactions
  - id (unique)
  - amount
  - account

TABLE balances
  - account (unique)
  - balance
*/
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile);
const moment = require('moment');

module.exports = {
  transfer({ from, to, amount }) {
    console.log(`Transfer ${from} to ${to}, amount ${amount}`)
    // have some time between transactions to prevent double click cases
    // get the last transaction of 'from' account
    // check if created_at time is less than 30 seconds.
    // insert into transactions
    // get the last balance of both the sides and update it
    return knex.transaction(async function (trx) {
      
      const lastTransaction = await knex('transactions').transacting(trx).where('account', from).orderBy('created_at', 'desc').limit(1)

      let lastTransactionTime = Date.now() - (30 * 1000);
      if (lastTransaction.length) {
        lastTransactionTime = new Date(lastTransaction[0].created_at).getTime()
      }

      /**
       * TODO
       * Check if lasttransaction difference is less than 30 seconds then throw error
       * 
       */

      const transactionResult = await knex.insert([
        { account: from, amount: (- amount) },
        { account: to, amount: amount }
      ]).into('transactions').transacting(trx)

      //get the balances
      const fromBalance = await knex('balances').where('account', from).transacting(trx);
      const toBalance = await knex('balances').where('account', to).transacting(trx);
      //update the balances
      await knex('balances').update({ balance: (fromBalance[0].balance - amount) }).where('account', from).transacting(trx)
      await knex('balances').update({ balance: (toBalance[0].balance + amount) }).where('account', to).transacting(trx)
    })
  },
  getBalance({ account }) {
    return knex('balances').where('account', account)
  },
  getTransactions() {
    return knex('transactions')
  }
}