import { boardInstance } from "./http";

export async function get_post_list(id) {
    if(id) {
        console.log("id: ", id);
        return boardInstance.get("/board/posts/" + id);
    }
    else {
        return boardInstance.get("/board/posts");
    }
}

export async function get_category_post_list(id) {
    return boardInstance.get("/board/posts?category_id=" + id);
}

export async function get_category_list() {
    return boardInstance.get("/board/categories");
}

export async function create_post(post) {
    return boardInstance.post("/board/posts", post, {
        headers: {
            'Content-Type': `application/json`,
        },
    });
}