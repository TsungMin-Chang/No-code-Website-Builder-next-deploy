import { check_user_id_exist } from "@/model/user";
import { get_nodes_by_page_id } from "@/model/node";
import { get_edge_node_by_id,get_page_information,get_page_owner, modify_page, delete_page } from "@/model/page";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
        const page_id = params.page_id;
        const page_owner = await get_page_owner(page_id)
        if(user_id !== page_owner){
            return Response.json('page not found', { status: 404 })
        }
        const edge_node = await get_edge_node_by_id(page_id);
        const head_node_id = edge_node[0];
        const tail_node_id = edge_node[1];
        const node_sql_result = await get_nodes_by_page_id(page_id);
        const nodes = {};
        for (const node_sql_result_element of node_sql_result) {
            nodes[node_sql_result_element.node_id] = {
                next_node_id: node_sql_result_element.next_node_id,
                content: JSON.parse(node_sql_result_element.content),
            };
        }
        response_object.nodes_data = [];
        let now_node_id = head_node_id;
        let node_data;
        while (now_node_id !== tail_node_id) {
            node_data = {
                id: now_node_id,
                ...nodes[now_node_id].content,
            };
            response_object.nodes_data.push(node_data);
            now_node_id = nodes[now_node_id].next_node_id;
        }
        response_object.information = await get_page_information(page_id)
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
        const request_body = await request.json()
        const page_id = params.page_id;
        const page_owner = await get_page_owner(page_id)
        if(user_id !== page_owner){
            return Response.json('page not found', { status: 404 })
        }
        const update = request_body.update;
        for (const column in update) {
            await modify_page(page_id, column, update[column]);
        }
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
        const page_id = params.page_id;
        const page_owner = await get_page_owner(page_id)
        if(user_id !== page_owner){
            return Response.json('page not found', { status: 404 })
        }
        await delete_page(page_id);
        return Response.json('success', { status: 200 })
    }
    catch (error) {
        console.log(error)
        return Response.json('api fail', { status: 500 })
    }
}