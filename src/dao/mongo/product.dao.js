import BaseDao from "./base.dao.js";
import { prodModel } from "./models/product.model.js";

class ProductDao extends BaseDao {
    constructor() {
        super(prodModel);
    }

};

export const productDao = new ProductDao();