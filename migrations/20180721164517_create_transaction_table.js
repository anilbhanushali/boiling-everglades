
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transactions', function (t) {
        t.increments('id').primary()
        t.string('account').notNullable()
        t.decimal('amount').notNullable()
        t.timestamps(true, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('transactions')
};
