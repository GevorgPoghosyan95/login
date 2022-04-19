const config = require('../../knexfile')['development']
import Knex from 'knex'
import { Model } from 'objection';


export default class PostgresStorage {
    static init(){
        const knex = Knex(config);
        Model.knex(knex);
    }
}