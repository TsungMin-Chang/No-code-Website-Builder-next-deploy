export default function usePages() {


    const getGallery = async (token) =>{
        const res = await fetch("/api/gallery", {
            method: "GET",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.pages_data;  //body.data.pages_data?
    }

    const createPage = async (token , name ,description,css_type,background_image, background_color1, background_color2) => {
        const res = await fetch("/api/page", {
            method: "POST",
            headers: {'token':token},
            body: JSON.stringify({
                name,
                description,
                css_type,
                background_image,
                background_color1,
                background_color2
            }),
        
        });

        if (!res.ok) {
            const body = await res.data.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.page_id;  //body.data.pages_data?
    }

    const getPage = async (token , page_id) => {
        const res = await fetch(`/api/page/${page_id}`, {
            method: "GET",
            headers: {'token':token}
        });
        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body;
    }

    const getPageInfo = async (token , page_id) => {
        const res = await fetch(`/api/page/${page_id}`, {
            method: "GET",
            headers: {'token':token}
        });
        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.information;
    }

    const changePage = async (token , page_id , ProjectName , description , css_type , bg_image , color1, color2) => {
        const res = await fetch(`/api/page/${page_id}`, {
            method: "PUT",
            headers: {'token':token},
            body: JSON.stringify({
                update:{
                    name: ProjectName,
                    description: description,
                    css_type: css_type,
                    background_image: bg_image,
                    background_color1: color1,
                    background_color2: color2,
                }
            }),
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return;  
    }

    const deletePage = async (token , page_id) => {
        const res = await fetch(`/api/page/${page_id}`, {
            method: "DELETE",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        return;  
    }


    return {
        getGallery,
        createPage,
        getPage,
        changePage,
        deletePage,
        getPageInfo
    };
}

