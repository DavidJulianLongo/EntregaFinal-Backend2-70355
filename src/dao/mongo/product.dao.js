import BaseDao from "./base.dao.js";
import { prodModel } from "./models/product.model.js";

class ProductDao extends BaseDao {
    constructor() {
        super(prodModel);
    }

    async getAll(filter, options) {
        try {
            const response = await prodModel.paginate(filter, options);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

};

export const productDao = new ProductDao();