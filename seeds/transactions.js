
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {id: 1, account: 'John', amount:100},
        {id: 2, account: 'Mac', amount: 200},
        {id: 3, account: 'Elvis', amount:300}
      ]);
    });
};
