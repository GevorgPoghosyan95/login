const config = require('../../knexfile')[process.env.ENV]
import Knex from 'knex'
import { Model } from 'objection';


export default class PostgresStorage {
    static init(){
        const knex = Knex(config);
        Model.knex(knex);
    }
}