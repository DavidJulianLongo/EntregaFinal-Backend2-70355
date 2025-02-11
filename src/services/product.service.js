import { productDao } from "../dao/mongo/product.dao.js";
import { CustomError } from "../utils/customError.js";


class ProductService{

    async create(obj) {
        try {
            const product = await productDao.create(obj);
            if (!product) throw new CustomError('Error creating item', 400);
            return product;
        } catch (error) {
            throw error;
        }
    }

    //Utiliza operadores de Mongo
    async getAllProducts(page = 1, limit = 10, query, sort) {
        try {
            const filter = query ? { $or: [{ category: query }, { stock: { $gt: 0 } }] } : {};
            const sortOrder = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
            const options = { page, limit, sort: sortOrder };
    
            return await productDao.getAll(filter, options);
        } catch (error) {
            throw new CustomError(`Error fetching products: ${error.message}`, 404);
        }
    }


    async getById(id) {
        try {
            const product = await productDao.getById(id);
            if (!product) throw new CustomError(`Item with ID: ${id} not found`, 404);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const updatedProd = await productDao.update(id, data);
            if (!updatedProd) throw new CustomError(`Error updating item with ID: ${id}`, 400);
            return updatedProd;
        } catch (error) {
            throw error;
        }
    }

    
    async remove(id) {
        try {
            const deletedProd = await productDao.deleteOne(id);
            if (!deletedProd) throw new CustomError(`Error deleting item with ID: ${id}`, 400);
            return deletedProd;
        } catch (error) {
            throw error;
        }
    }


}

export const prodService = new ProductService();


