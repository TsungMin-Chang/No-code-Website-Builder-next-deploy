import { check_user_id_exist } from "@/model/user";
import { get_pages_by_user_id } from "@/model/page";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function GET(request) {
    try {
        const token = request.headers.get('token')
        if (!token) {
            return Response.json('token not found or wrong', { status: 403 })
        } 
        const user_id = jwt.verify(token, process.env.JWT_KEY);
        if (!check_user_id_exist(user_id)) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const response_object = {};
        response_object.pages_data = await get_pages_by_user_id(user_id);
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}
