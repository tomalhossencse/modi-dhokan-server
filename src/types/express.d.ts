import { JwtPayload } from ".";
import { DeliveryPartner } from "../../generated/prisma/client";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
            partner?: DeliveryPartner;
        }
    }
}
