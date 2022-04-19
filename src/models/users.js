import BasicModel from "./base.model";


class UsersModel extends BasicModel {
    static get tableName() {
        return 'users';
    }
}

export default UsersModel;