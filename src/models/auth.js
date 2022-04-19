import BaseModel from "./base.model";

class AuthModel extends BaseModel {
    static get tableName() {
        return 'auth';
    }

}

export default AuthModel;