'use strict'

/*
|--------------------------------------------------------------------------
| ParcelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ParcelSeeder {
  async run() {
    await Factory.model("App/Models/Parcel").createMany(50);
  }
}

module.exports = ParcelSeeder
