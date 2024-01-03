export default function useNodes() {

    const createNode = async (token, pageId, data) => {
        const pre_node_id = data.frontPointer;
        delete data.frontPointer;
        const jsonData = JSON.stringify({
            pre_node_id,
            content: {...data}
        });
        
        const res = await fetch(`/api/node/${pageId}`, {
            method: "POST",
            headers: {'token':token},
            body: jsonData,
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body;
    }

    const getNodes = async (token, pageId) => {
        const res = await fetch(`/api/node/${pageId}`, {
            method: "GET",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.data.json();
        return body;  
    }

    const deleteNode = async (token, nodeId) => {
        const res = await fetch(`/api/node/${nodeId}`, {
            method: "DELETE",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.data.json();
            throw new Error(body.error);
        }
        return;  
    }

    return {
        createNode,
        getNodes,
        deleteNode,
    };
}

