'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (collection) => {
      collection.increments()
      collection.integer('user_id').unsigned().references('id').incollection('users')
      collection.string('longitude_user', 255).notNullable()
      collection.string('latitude_user', 255).defaultTo(0)
      collection.string('id_collector', 255).defaultTo(0)
      collection.integer('collector_id').unsigned().references('id').incollection('users')
      collection.string('longitude_collector', 255).defaultTo(0)
      collection.string('latitude_collector', 255).defaultTo(0)
      collection.boolean('isachieve').defaultTo(false)
      collection.integer('amount').notNullable()
      collection.datetime('service_date')
      collection.string('begin',5).nullable()
      collection.string('end', 5).nullable()
      collection.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
