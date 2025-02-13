import { prodService } from "../services/product.service.js";

class ProductController {

    async createProduct(req, res, next) {
        try {
            const product = await prodService.createProduct(req.body);
            res.json({
                status: "Succes",
                payload: product
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const { page, limit, query, sort } = req.query;
            const response = await prodService.getAllProducts(page, limit, query, sort);
            res.json({
                status: response.docs.length > 0? 'success' : 'error',
                payload: { products: response.docs },
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${response.prevPage}&sort=${sort}&query=${query}`: null, 
                nextLink: response.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${response.nextPage}&sort=${sort}&query=${query}` : null
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await prodService.getProductById(id);
            res.json({
                status: "Succes",
                payload: product
            });
        } catch (error) {
            next(error);
        }
    }


    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const updatedProd = await prodService.updateProduct(id, req.body);
            res.json({
                status: "Succes",
                payload: updatedProd
            });
        } catch (error) {
            next(error);
        }
    }


    async removeProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deletedProd = await prodService.removeProduct(id);
            res.json({
                status: "Succes",
                message: "Removed product",
                payload: deletedProd
            });
        } catch (error) {
            next(error);
        }
    }





}

export const prodController = new ProductController();