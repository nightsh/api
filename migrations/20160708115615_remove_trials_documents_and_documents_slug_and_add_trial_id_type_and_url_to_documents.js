'use strict';

exports.up = (knex) => (
  knex.schema
    .dropTable('trials_documents')
    .table('documents', (table) => {
      table.dropColumns([
        'slug',
      ]);
      table.uuid('trial_id')
        .notNullable()
        .references('trials.id');
      table.text('type')
        .notNullable();
      table.text('url')
        .notNullable();
    })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
