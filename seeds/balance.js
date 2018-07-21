
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('balances').del()
    .then(function () {
      // Inserts seed entries
      return knex('balances').insert([
        {account: 'John', balance:100},
        {account: 'Mac', balance:200},
        {account: 'Elvis', balance:300}
      ]);
    });
};
