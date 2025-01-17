import BaseDao from "./base.dao.js";
import { userModel } from "./models/user.model.js";

class UserDao extends BaseDao{
    constructor() {
        super(userModel);
    }

    async getByEmail(email) {
        const user = await userModel.findOne({ email });
        return user;
    }

}

export const userDao = new UserDao();