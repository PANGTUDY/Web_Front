import { boardInstance } from "./http";

export async function get_post_list() {
    return boardInstance.get("/board/posts");
}

export async function get_category_list() {
    return boardInstance.get("/board/categories");
}