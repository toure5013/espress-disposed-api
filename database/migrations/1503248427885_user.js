'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (collection) => {
      collection.increments()
      collection.string('firstname', 80).notNullable()
      collection.string('lastname', 80).notNullable()
      collection.string('username', 80).nullable()
      collection.string('phone', 80).notNullable().unique()
      collection.string('email', 254).nullable()().unique()
      collection.string('password', 60).notNullable()
      collection.boolean('isactive').defaultTo(true)
      collection.integer('status').defaultTo(10000)
      collection.integer('longitude').defaultTo(0)
      collection.integer('latitude').defaultTo(0)
      collection.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
