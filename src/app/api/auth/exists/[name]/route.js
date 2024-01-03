import { check_username_exist } from "@/model/user";
import "dotenv/config";

export async function GET(request, { params }) {
    try {
        const response_object = {};
        const name = params.name
        response_object.user_exist = await check_username_exist(name);
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}