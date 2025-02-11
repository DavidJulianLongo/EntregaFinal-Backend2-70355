import { prodService } from "../services/product.service.js";

class ProductController {

    async create(req, res, next) {
        try {
            const product = await prodService.create(req.body);
            res.json({
                status: "Succes",
                payload: product
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
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
                prevLink: response.hasPrevPage ? `http://localhost:8080/products?limit=${limit}&page=${response.prevPage}&sort=${sort}&query=${query}`: null, 
                nextLink: response.hasNextPage ? `http://localhost:8080/products?limit=${limit}&page=${response.nextPage}&sort=${sort}&query=${query}` : null
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await prodService.getById(id);
            res.json({
                status: "Succes",
                payload: product
            });
        } catch (error) {
            next(error);
        }
    }


    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedProd = await prodService.update(id, req.body);
            res.json({
                status: "Succes",
                payload: updatedProd
            });
        } catch (error) {
            next(error);
        }
    }


    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const deletedProd = await prodService.remove(id);
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