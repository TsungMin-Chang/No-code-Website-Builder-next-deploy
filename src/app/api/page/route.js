import { check_user_id_exist } from "@/model/user";
import { add_page } from "@/model/page";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(request) {
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
        const request_body = await request.json()
        const name = request_body.name;
        const description = request_body.description || "";
        const css_type = request_body.css_type || -1;
        const background_image = request_body.background_image || -1;
        const background_color1 = request_body.background_color1 || "";
        const background_color2 = request_body.background_color2 || "";
        response_object.page_id = await add_page(
            user_id,
            name,
            description,
            css_type,
            background_image,
            background_color1,
            background_color2,
        );
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}
