import { Request, Response } from "express";
// register
// post / api / auth / register
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || password) {
        return res.status(400).json({
            message: "Please provide all fields",
        });
    }
};
