import { check_user_id_exist } from "@/model/user";
import { add_middle_node, get_node_content,get_node_owner, modify_node_content, delete_node } from "@/model/node";
import { get_page_owner } from "@/model/page";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(request, { params }) {
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
        const page_id = params.node_or_page_id;
        const page_owner = await get_page_owner(page_id)
        if(user_id !== page_owner){
            return Response.json('place not found', { status: 404 })
        }
        const pre_node_id = request_body.pre_node_id;
        const node_owner = await get_node_owner(pre_node_id)
        if(user_id !== node_owner){
            return Response.json('place not found', { status: 404 })
        }
        const content = JSON.stringify(request_body.content);
        response_object.node_id = await add_middle_node(
            page_id,
            pre_node_id,
            content,
        );
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}

export async function GET(request, { params }) {
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
        const node_id = params.node_or_page_id;
        const node_owner = await get_node_owner(node_id)
        if(user_id !== node_owner){
            return Response.json('node not found', { status: 404 })
        }
        const content = await get_node_content(node_id);
        if (content === "") {
            return Response.json('node not found', { status: 404 })
        }
        response_object.content = JSON.parse(content);
        return Response.json(response_object, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('token')
        if (!token) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const user_id = jwt.verify(token, process.env.JWT_KEY);
        if (!check_user_id_exist(user_id)) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const node_id = params.node_or_page_id;
        const node_owner = await get_node_owner(node_id)
        if(user_id !== node_owner){
            return Response.json('node not found', { status: 404 })
        }
        const request_body = await request.json()
        const content = JSON.stringify(request_body.content);
        await modify_node_content(node_id, content);
        return Response.json('success', { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('token')
        if (!token) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const user_id = jwt.verify(token, process.env.JWT_KEY);
        if (!check_user_id_exist(user_id)) {
            return Response.json('token not found or wrong', { status: 403 })
        }
        const node_id = params.node_or_page_id;
        const node_owner = await get_node_owner(node_id)
        if(user_id !== node_owner){
            return Response.json('node not found', { status: 404 })
        }
        await delete_node(node_id);
        return Response.json('success', { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}