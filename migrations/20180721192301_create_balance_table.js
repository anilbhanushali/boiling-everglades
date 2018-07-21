
exports.up = function(knex, Promise) {
    return knex.schema.createTable('balances', function (t) {
        t.string('account').primary()
        t.decimal('balance').notNullable()
        t.timestamps(true, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('balances')
};
