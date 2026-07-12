import { OrderStatus } from "../../../generated/prisma/enums";
import { OrderWhereInput } from "../../../generated/prisma/models";
import { inngest } from "../../inngest";
import { prisma } from "../../lib/prisma";
import { ICreateOrderPayload, IUpdateOrderStatusPayload } from "../../types";

class OrderService {
    async createOrder(userId: string, payload: ICreateOrderPayload) {
        const { items, paymentMethod, shippingAddress } = payload;

        //check if orders items is empty
        if (!items || items.length === 0) {
            throw new Error("No orders items");
        }

        // look up actual prodcut price
        const productIds = items.map((i: any) => i.product);
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        const productMap: Record<string, (typeof products)[0]> = {};

        products.forEach((p: any) => (productMap[p.id] = p));

        // check if product in stock
        for (const item of items) {
            const product = productMap[item.product];
            if (!product || (product.stock ?? 0) < item.quantity) {
                throw new Error("Product out of stock");
            }
        }

        const orderItems = items.map((item: any) => {
            const dbProduct = productMap[item.product];
            if (!dbProduct)
                throw new Error(`Product ${item.product} not found`);

            return {
                product: dbProduct.id,
                name: dbProduct.name,
                image: dbProduct.image,
                price: dbProduct.price,
                quantity: item.quantity,
                unit: dbProduct.unit,
            };
        });

        const subtotal = orderItems.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
        );

        const deliveryFee = subtotal > 20 ? 0 : 1.99;
        const tax = Math.round(subtotal * 8) / 100;
        const total = Math.round(subtotal + deliveryFee + tax);

        const transactionResult = await prisma.$transaction(async (tx) => {
            console.log("Creating order...");

            const order = await tx.order.create({
                data: {
                    userId,
                    items: orderItems,
                    shippingAddress,
                    paymentMethod,
                    subtotal,
                    deliveryFee,
                    tax,
                    total,
                    statusHistory: [
                        {
                            status: "placed",
                            note: "Order placed successfully",
                            timestamp: new Date(),
                        },
                    ],
                },
            });

            console.log("Order created");

            if (paymentMethod === "card") {
                //stripe payment link
            }
            console.log("Updating stock...");

            //decrease stock
            for (const item of orderItems) {
                await tx.product.update({
                    where: {
                        id: item.product,
                    },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            console.log("Stock updated");

            console.log("Sending event...");

            // send stock update event for each product in the order
            for (const item of orderItems) {
                await inngest.send({
                    name: "inventory/stock.updated",
                    data: { productId: item.product },
                });
            }

            console.log("Event sent");
            await inngest.send({
                name: "order/placed",
                data: {
                    orderId: order.id,
                },
            });
            return { order };
        });

        return transactionResult;
    }

    async getCustomerOrders(userId: string, status: OrderStatus) {
        const where: OrderWhereInput = {
            userId,
            NOT: [
                {
                    paymentMethod: "card",
                    isPaid: false,
                },
            ],
        };

        if (
            status
            // && status !== "all"
        ) {
            where.status = status;
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                deliveryPartner: {
                    select: {
                        name: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return orders;
    }

    async getOrder(userId: string, orderId: string) {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId,
            },

            include: {
                deliveryPartner: {
                    select: {
                        name: true,
                        phone: true,
                        avatar: true,
                        vehicleType: true,
                    },
                },
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    }

    async updateOrderStatus(
        payload: IUpdateOrderStatusPayload,
        orderId: string,
    ) {
        const { status, note } = payload;

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        const history = (
            Array.isArray(order.statusHistory) ? order.statusHistory : []
        ) as any[];

        history.push({
            status,
            note: note || `Order ${status.toLowerCase()}`,
            timestamp: new Date(),
        });

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status,
                statusHistory: history,
            },
        });

        return updatedOrder;
    }

    async getAllOrders() {
        const orders = await prisma.order.findMany({
            where: {
                NOT: [
                    {
                        paymentMethod: "card",
                        isPaid: false,
                    },
                ],
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                deliveryPartner: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return orders;
    }

    async getOrderLocation(orderId: string, userId: string) {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId,
            },
            select: {
                liveLocation: true,
                status: true,
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        return { liveLocation: order.liveLocation, status: order.status };
    }
}

export default new OrderService();
