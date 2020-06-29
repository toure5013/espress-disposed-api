'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayementSchema extends Schema {
  up () {
    this.create('payements', (collection) => {
      collection.increments()
      collection.string('payement_number', 255).notNullable().unique()
      collection.string('payement_channel', 255).notNullable()
      collection.integer('user_id').unsigned().references('id').incollection('users')
      collection.integer('collector_id').unsigned().references('id').incollection('users')
    })
  }

  down () {
    this.drop('payements')
  }
}

module.exports = PayementSchema
