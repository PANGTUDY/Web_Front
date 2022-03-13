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

export async function delete_post(id) {
     return boardInstance.delete("/board/posts/" + id);
}

export async function get_comments(id) {
    return boardInstance.get("/board/posts/" + id + "/comments");
}

export async function create_comment(comment) {
    return boardInstance.post("/board/posts/" + comment.postId + "/comments", comment, {
        headers: {
            'Content-Type': `application/json`,
        },
    });
}

export async function delete_comment(postId, commentId) {
    return boardInstance.delete("/board/posts/" + postId + "/comments/" + commentId);
}