export default function useUsers() {


    const UserExist = async (username) =>{
        const res = await fetch(`/api/auth/exists/${username}`, {
            method: "GET",
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.user_exist;  //body.data.user_exist?
    }

    const verifyUser = async (username, password) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name:username,
                password:password
            }),
        })

        if (!res.ok) {
            return 'error';
        }
        const body = await res.json();
        return body.jwt;  
    }

    const createUser = async ( username , password) => {

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name:username,
                password:password
            }),
        })

        if (!res.ok) {
            return 'error';
        }
        const data = await res.json();
        return data.jwt;  //body.data.pages_data?
    }

    const changePassword = async (token) => {
        const res = await fetch("/api/user/password", {
            method: "PUT",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.new_password;  
    }

    const getUsername = async (token) => {
        const res = await fetch("/api/user", {
            method: "GET",
            headers: {'token':token}
        });

        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        const body = await res.json();
        return body.name;  
    }


    return {
        UserExist,
        verifyUser,
        createUser,
        changePassword,
        getUsername,
    };
}

