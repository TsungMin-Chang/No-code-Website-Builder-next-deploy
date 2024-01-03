import { get_user_id } from "@/model/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(request) {
    try {
        const request_body = await request.json()
        const response_object = {};
        const name = request_body.name;
        const password = request_body.password;
        const user_id = await get_user_id(name, password);
        if (user_id === "") {
            return Response.json('username or password wrong', { status: 400 })
        }
        response_object.jwt = jwt.sign(user_id, process.env.JWT_KEY);
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}