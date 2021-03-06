import { boardInstance, fileInstance } from "./http";

export async function get_post_list(page, postId) {
  if (postId) {
    return boardInstance.get("/board/posts/" + postId);
  } else if (page) {
    return boardInstance.get("/board/posts?page_num=" + page);
  } else {
    return boardInstance.get("/board/posts");
  }
}

export async function get_category_post_list(page, categoryId) {
  return boardInstance.get(
    "/board/posts?page_num=" + page + "&category_id=" + categoryId,
  );
}

export async function get_category_list() {
  return boardInstance.get("/board/categories");
}

export async function get_adjacent_list(categoryId, postId) {
  return boardInstance.get(
    "/board/posts/adjacent/" + categoryId + "/" + postId,
  );
}

export async function get_likes_user_list(postId) {
  return boardInstance.get("/board/posts/" + postId + "/like");
}

export async function change_like(postId, userId) {
  return boardInstance.post("/board/posts/" + postId + "/like", userId, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
}

export async function get_search_post_list(categoryId, item, keyword) {
  if (categoryId == 0) {
    return boardInstance.get("/board/posts?" + item + "=" + keyword);
  } else {
    // search with category
    return boardInstance.get(
      "/board/posts?category_id=" + categoryId + "&" + item + "=" + keyword,
    );
  }
}

export async function create_post(post) {
  return boardInstance.post("/board/posts", post, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
}

export async function upload_file(post, files) {
  return fileInstance.post("/post/" + post + "/upload", files, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function patch_post(id, post) {
  return boardInstance.patch("/board/posts/" + id, post, {
    headers: {
      "Content-Type": `application/json`,
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
  return boardInstance.post(
    "/board/posts/" + comment.postId + "/comments",
    comment,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    },
  );
}

export async function delete_comment(postId, commentId) {
  return boardInstance.delete(
    "/board/posts/" + postId + "/comments/" + commentId,
  );
}

export async function patch_comment(postId, commentId, comment) {
  return boardInstance.patch(
    "/board/posts/" + postId + "/comments/" + commentId,
    comment,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    },
  );
}
