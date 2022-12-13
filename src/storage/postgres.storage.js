import Knex from 'knex';
import { Model } from 'objection';

const config = require('../../knexfile')[process.env.ENV];

export default class PostgresStorage {
  static init() {
    console.log(config);
    const knex = Knex(config);
    Model.knex(knex);
  }
}
