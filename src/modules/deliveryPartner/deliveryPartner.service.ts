import { Order } from "../../../generated/prisma/browser";
import { OrderStatus } from "../../../generated/prisma/enums";
import { OrderWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ILoginPayload, IUpdateLocationPayload, JwtPayload } from "../../types";
import { signToken } from "../../utils/jwt";
import authService from "../auth/auth.service";

class DeliveryPartnerService {
    async loginPartner(payload: ILoginPayload) {
        const { email, password } = payload;
        if (!email || !password) {
            throw new Error("Please provide email and password fields");
        }

        const partner = await prisma.deliveryPartner.findUnique({
            where: {
                email,
            },
        });

        if (!partner) {
            throw new Error("Delivery Part not exists with this email!");
        }

        if (!partner.isActive) {
            throw new Error("Your account has been deactivated");
        }

        const isMatchPassword = await authService.comparePassword(
            password,
            partner.password,
        );

        if (!isMatchPassword) {
            throw new Error("Your provided password is incorrect!");
        }
        const jwtPayload = {
            id: partner.id,
            name: partner.name,
            email: partner.email,
        } as JwtPayload;

        const { accessToken, refreshToken } = signToken(jwtPayload);

        const userData: any = { ...partner };

        delete userData.password;

        return { accessToken, refreshToken, user: userData };
    }

    async getMyDeliveries(partnerId: string, status: string) {
        const where: OrderWhereInput = { deliveryPartnerId: partnerId };

        if (status === "active") {
            where.status = { in: ["ASSIGNED", "PACKED", "OUT_FOR_DELIVERY"] };
        } else if (status === "completed") {
            where.status = { in: ["DELIVERED", "CANCELLED"] };
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                user: { select: { name: true, email: true, phone: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return orders;
    }

    async getSingleDelivery(partnerId: string, orderId: string) {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                deliveryPartnerId: partnerId,
            },
            include: {
                user: { select: { name: true, email: true, phone: true } },
            },
        });

        if (!order) {
            throw new Error("Delivery not found");
        }

        return order;
    }

    async completeDelivery(partnerId: string, orderId: string, otp: string) {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                deliveryPartnerId: partnerId,
            },
            include: {
                deliveryPartner: true,
            },
        });

        if (
            !order ||
            order.status === "CANCELLED" ||
            order.status === "DELIVERED"
        ) {
            throw new Error("Invalid Request!");
        }

        if (order.deliveryOtp !== otp) {
            throw new Error("Invalid OTP!");
        }

        const history: any[] = Array.isArray(order.statusHistory)
            ? order.statusHistory
            : [];

        history.push({
            status: OrderStatus.DELIVERED,
            note: `Delivery by partner ${order.deliveryPartner?.name}`,
            timestamp: new Date(),
        });

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: "DELIVERED",
                statusHistory: history,
                deliveryOtp: "",
            },
        });

        return updatedOrder;
    }

    async cancelDelivery(partnerId: string, orderId: string, reason: string) {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                deliveryPartnerId: partnerId,
            },
            include: {
                deliveryPartner: true,
            },
        });

        if (order!.status === "DELIVERED") {
            throw new Error("Can't cancel a delivered order");
        }

        const history: any[] = Array.isArray(order!.statusHistory)
            ? order!.statusHistory
            : [];

        history.push({
            status: OrderStatus.CANCELLED,
            note: reason || "",
            timestamp: new Date(),
        });

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: "CANCELLED",
                statusHistory: history,
            },
        });

        return updatedOrder;
    }

    async updateDeliveryStatus(
        partnerId: string,
        orderId: string,
        status: any,
    ) {
        if (
            status &&
            [OrderStatus.PACKED, OrderStatus.OUT_FOR_DELIVERY].includes(status)
        ) {
            throw new Error("Invalid status update!");
        }
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                deliveryPartnerId: partnerId,
            },
        });

        const history = order!.statusHistory as any[];

        history.push({
            status,
            note: `Status updated to ${status}`,
            timestamp: new Date(),
        });

        const updatedOrder = await prisma.order.update({
            where: {
                id: order?.id,
            },
            data: {
                status,
                statusHistory: history,
            },
        });

        return updatedOrder;
    }

    async updateLocation(
        partnerId: string,
        orderId: string,
        payload: IUpdateLocationPayload,
    ) {
        const { lat, lng } = payload;

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                deliveryPartnerId: partnerId,
                status: {
                    in: [
                        OrderStatus.ASSIGNED,
                        OrderStatus.PACKED,
                        OrderStatus.OUT_FOR_DELIVERY,
                    ],
                },
            },
        });

        const updatedOrder = await prisma.order.update({
            where: {
                id: order!.id,
            },
            data: {
                liveLocation: {
                    lat,
                    lng,
                    updatedAt: new Date(),
                },
            },
        });

        return { success: true };
    }
}

export default new DeliveryPartnerService();
