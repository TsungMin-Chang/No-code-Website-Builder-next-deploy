import { check_user_id_exist,update_user_password } from "@/model/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function PUT(request) {
    try {
        const token = request.headers.get('token')
        if (!token) {
            return Response.json('token not found or wrong', { status: 403 })
        } 
        const user_id = jwt.verify(token, process.env.JWT_KEY);
        if (!check_user_id_exist(user_id)) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const request_body = await request.json()
        const new_password = request_body.new_password;
        const result = await update_user_password(user_id, new_password);
        return Response.json('success', { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}