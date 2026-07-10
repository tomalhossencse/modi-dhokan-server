import { ProductWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IProductCreatePayload, IProductQuery } from "../../types";

class ProductService {
    async createProduct(payload: IProductCreatePayload) {
        if (!payload) {
            throw new Error("Please provide product data in body");
        }

        const { name, image, category, price } = payload;

        if (!name || !image || !category || !price) {
            throw new Error(
                "Please provide fields (name, image, category & price)",
            );
        }
        const product = await prisma.product.create({
            data: payload,
        });

        return product;
    }

    async getFlashDeals() {
        const products = await prisma.product.findMany({
            where: {
                stock: {
                    gt: 0,
                },
            },
            orderBy: {
                originalPrice: "desc",
            },
        });

        const productsWithDiscount = products.map((p) => {
            const discount =
                p.originalPrice && p.price
                    ? Math.floor(
                          ((p.originalPrice - p.price) / p.originalPrice) * 100,
                      )
                    : 0;

            return { ...p, discount };
        });

        return productsWithDiscount.slice(0, 8);
    }

    async getProducts(query: IProductQuery) {
        const { category, maxPrice, minPrice, search, sort } = query;

        const where: ProductWhereInput = {};

        if (category && category !== "all") where.category = category;

        if (search) where.name = { contains: search, mode: "insensitive" };

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) {
                where.price.gte = Number(minPrice);
            }
            if (maxPrice) {
                where.price.lte = Number(maxPrice);
            }
        }

        const orderBy: any = {};

        if (sort === "price-low") orderBy.price = "asc";
        else if (sort === "price-high") orderBy.price = "desc";
        else orderBy.createdAt = "desc";

        const products = await prisma.product.findMany({
            where,
            orderBy,
        });

        const productsWithDiscount = products.map((p) => {
            const discount =
                p.originalPrice && p.price
                    ? Math.floor(
                          ((p.originalPrice - p.price) / p.originalPrice) * 100,
                      )
                    : 0;

            return { ...p, discount };
        });

        return productsWithDiscount;
    }

    async getProduct(productId: string) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        const discount =
            product.originalPrice && product.price
                ? Math.floor(
                      ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                  )
                : 0;

        return { ...product, discount };
    }
}

export default new ProductService();
