import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateDeliveryPartner, IUpdateDeliveryPartner } from "../../types";
import authService from "../auth/auth.service";

class AdminService {
    async getAdminStats() {
        const [
            totalOrders,
            totalUsers,
            totalProducts,
            outOfStock,
            totalPartners,
            recentOrders,
        ] = await Promise.all([
            prisma.order.count({
                where: {
                    NOT: [
                        {
                            paymentMethod: "card",
                            isPaid: false,
                        },
                    ],
                },
            }),

            prisma.user.count(),

            prisma.product.count(),

            prisma.product.count({
                where: {
                    stock: 0,
                },
            }),

            prisma.deliveryPartner.count(),

            prisma.order.findMany({
                where: {
                    NOT: [
                        {
                            paymentMethod: "card",
                            isPaid: false,
                        },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 8,
                include: {
                    user: { select: { name: true, email: true } },
                    deliveryPartner: { select: { name: true, phone: true } },
                },
            }),
        ]);

        return {
            totalOrders,
            totalUsers,
            totalProducts,
            outOfStock,
            totalPartners,
            recentOrders,
        };
    }

    async getDeliveryPartners() {
        const partners = await prisma.deliveryPartner.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return partners;
    }

    async createDeliveryPartner(payload: ICreateDeliveryPartner) {
        const { email, name, password, phone, vehicleType } = payload;

        if (!name || !email || !password || !phone) {
            throw new Error("Please provide all required fields");
        }

        const hashPassword = await authService.hashPassword(password);

        const partner = await prisma.deliveryPartner.create({
            data: {
                email,
                name,
                phone,
                password: hashPassword,
                vehicleType,
            },
        });

        return partner;
    }

    async updateDeliveryPartner(
        partnerId: string,
        payload: IUpdateDeliveryPartner,
    ) {
        const { name, isActive, phone, vehicleType } = payload;

        const partner = await prisma.deliveryPartner.update({
            where: {
                id: partnerId,
            },
            data: {
                name,
                phone,
                isActive,
                vehicleType,
            },
        });

        return partner;
    }

    async assignDeliveryPartner(orderId: string, partnerId: string) {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        const partner = await prisma.deliveryPartner.findUnique({
            where: { id: partnerId },
        });

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        let status = order!.status;

        const history: any[] = Array.isArray(order!.statusHistory)
            ? order!.statusHistory
            : [];

        if (order!.status === "PLACED" || order!.status === "CONFIRMED") {
            status = OrderStatus.ASSIGNED;
            history.push({
                status: OrderStatus.ASSIGNED,
                note: `Assigned to ${partner!.name}`,
                timestamp: new Date(),
            });
        }

        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                deliveryPartnerId: partnerId,
                statusHistory: history,
                deliveryOtp: otp,
                status,
            },
        });

        return order;
    }
}

export default new AdminService();
