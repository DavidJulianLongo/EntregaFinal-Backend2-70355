import BaseDao from "./base.dao.js";
import { userModel } from "./models/user.model.js";

class UserDao extends BaseDao{
    constructor() {
        super(userModel);
    }

    async getByEmail(email) {
        return await userModel.findOne({ email });
    }

}

export const userDao = new UserDao();