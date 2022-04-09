import { auth_instance } from "./http";

export async function login(credentials) {
    return auth_instance.post("/login", credentials);
}

export async function reissue(refreshToken) {
    return auth_instance.post("/token", {}, {
        headers: {
            'Authorization': 'Bearer ' + refreshToken,
        },
    });
}