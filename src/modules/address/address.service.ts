import { prisma } from "../../lib/prisma";
import { ICreateAddressPayload } from "../../types";

class AddressService {
    async getUserAddresses(userId: string) {
        const addresses = await prisma.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return addresses;
    }
    async addAddress(userId: string, payload: ICreateAddressPayload) {
        const { address, city, label, lat, lng, state, zip, isDefault } =
            payload;

        if (lat == null || lng == null) {
            throw new Error(
                "Location Cordinates are required. Please allow location address",
            );
        }
        const currentAddress = await prisma.address.findMany({
            where: {
                userId,
            },
        });

        let makeDefault = isDefault;

        if (currentAddress.length === 0) makeDefault = true;

        await prisma.address.create({
            data: {
                userId,
                address,
                city,
                label,
                lat: Number(lat),
                lng: Number(lng),
                state,
                zip,
                isDefault: makeDefault,
            },
        });

        const addresses = await prisma.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return addresses;
    }

    async updateAddress(
        addressId: string,
        userId: string,
        payload: ICreateAddressPayload,
    ) {
        const { address, city, label, lat, lng, state, zip, isDefault } =
            payload;

        if (lat == null || lng == null) {
            throw new Error(
                "Location Cordinates are required. Please allow location address",
            );
        }

        if (isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId,
                },
                data: {
                    isDefault: false,
                },
            });
        }

        await prisma.address.update({
            where: { id: addressId },
            data: {
                userId,
                address,
                city,
                label,
                lat,
                lng,
                state,
                zip,
                isDefault,
            },
        });

        const addresses = await prisma.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return addresses;
    }

    async deleteAddress(addressId: string, userId: string) {
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                userId,
            },
        });

        if (!address) {
            throw new Error("Address not found");
        }

        await prisma.address.delete({
            where: {
                id: addressId,
            },
        });

        const addresses = await prisma.address.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return addresses;
    }
}

export default new AddressService();
