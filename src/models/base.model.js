import {Model} from "objection";


export default class BaseModel extends Model {

    constructor() {
        super();
    }

    static async getByParams(params) {
        return this.query().where(params).first();
    }

    static async create(payload){
        return this.query().insert(payload);
    }

    static async update(params,update){
        await this.query().where(params).patch(update)
        return this.getByParams(params)
    }

    static async delete(params){
       return this.query().where(params).delete();
    }

}