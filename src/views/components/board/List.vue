<template>
  <v-app>
    <div class="container pt-lg-md" style="min-height: 1200px">
      <div class="row justify-content-center">
        <div class="col-lg-2">
          <v-select
            v-model="selectedItem"
            :items="selectItems"
            label="제목"
            single-line
          ></v-select>
        </div>
        <div class="col-lg-8">
          <v-text-field
            v-model="keyword"
            :append-icon="'fa-search'"
            placeholder="키워드를 입력하세요"
            hide-details="auto"
            type="text"
            @click:append="searchIcon"
            v-on:keyup.enter="searchIcon"
          >
            <v-icon>fas fa-search</v-icon>
          </v-text-field>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-2">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-subheader>CATEGORY</v-subheader>
              <v-list-item-group
                mandatory
                v-model="selectedCategory"
                color="primary"
              >
                <v-list-item
                  v-for="(item, idx) in category_list"
                  :key="idx"
                  @change="categoryChange(idx)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.categoryName">
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </div>
        <div class="col-lg-8">
          <div class="row justify-content-right">
            <div class="col-lg-10">
              <h4>{{ category.categoryName }}</h4>
            </div>
            <div class="col-lg-2 text-right">
              <v-btn color="primary" elevation="2" outlined v-on:click="newPost"
                >글쓰기</v-btn
              >
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <table class="tbList">
                <colgroup>
                  <col width="80%" />
                  <col width="10%" />
                  <col width="10%" />
                </colgroup>
                <tr v-for="(row, idx) in posts" :key="idx">
                  <td
                    class="text-left"
                    @click="fnView(`${row.postId}`, `${row.categoryId}`)"
                  >
                    <span class="title">{{ row.title }}</span>
                    <span class="hashtag">
                      <v-chip
                        class="ma-1"
                        color="blue lighten-1"
                        small
                        outlined
                        v-for="(tag, index) in row.tags.split(',')"
                        :key="index"
                      >
                        {{ tag }}
                      </v-chip>
                    </span>
                  </td>
                  <td>{{ row.writer }}</td>
                  <td
                    style="
                      text-align: right;
                      padding-right: 5px;
                      font-size: 0.85em;
                    "
                  >
                    {{ row.date.substr(0, 10) }}
                  </td>
                </tr>
                <tr v-if="posts.length == 0">
                  <td colspan="4">게시글이 없습니다.</td>
                </tr>
              </table>
            </div>

            <div class="col-lg-10">
                  <v-pagination
                    v-model="currPage"
                    :length="totalPage"
                    light
                    color="#b1e399"
                  ></v-pagination>
              </div>
          </div>
                   
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import * as Api from "@/api/board.js";

export default {
  data: () => ({
    keyword: "",
    category_list: [],
    category: {},
    posts: [],
    currPage: "",
    totalPage: "",

    hint: "키워드를 입력하세요",
    selectItems: [
      { text: "제목", value: "title" },
      { text: "제목+내용", value: "contents" },
      { text: "해시태그", value: "tag" },
      { text: "작성자", value: "writer" },
    ],
    selectedItem: "title",
    selectedCategory: 0,
  }),

  mounted() {
    // 전체 글 목록 불러오는 Api
    Api.get_post_list(1)
      .then((res) => {
        this.currPage = res.data.currPageNum;
        this.totalPage = res.data.totalPageNum;
        this.posts = res.data.posts;
      })
      .catch((error) => {
        console.log("error occured!: ", error);
      });

    // 카테고리 전체 목록 불러오는 Api
    Api.get_category_list()
      .then((res) => {
        this.category_list = res.data;
        this.category_list.push({ categoryId: 0, categoryName: "전체" });

        this.category_list.sort(function (a, b) {
          return a.categoryId - b.categoryId;
        });
        this.category = this.category_list[0];
      })
      .catch((error) => {
        console.log("error occured!: ", error);
      });
  },

  watch: {
    category: function(val) {
      this.categroy_name = val.categoryName;
    },

    currPage: function(page) {
      Api.get_category_post_list(page, this.category.categoryId)
        .then((res) => {
          this.posts = res.data.posts;
          this.currPage = res.data.currPageNum;
          this.totalPage = res.data.totalPageNum;
        })
        .catch((error) => {
          console.log("error occured!: ", error);
        });
    },
  },

  methods: {
    // Search the keyword
    searchIcon() {
      if (this.keyword.length > 0) {
        Api.get_search_post_list(
          this.category.categoryId,
          this.selectedItem,
          this.keyword
        )
          .then((res) => {
            this.posts = res.data.posts;
            this.currPage = res.data.currPageNum;
            this.totalPage = res.data.totalPageNum;
          })
          .catch((error) => {
            console.log("error occured!: ", error);
          });
      } else {
        Api.get_post_list()
          .then((res) => {
            this.posts = res.data.posts;
            this.currPage = res.data.currPageNum;
            this.totalPage = res.data.totalPageNum;
          })
          .catch((error) => {
            console.log("error occured!: ", error);
          });
      }
    },

    // create a new post
    newPost() {
      this.$router.push({ path: "/board/new/" });
    },

    // move to the detail page
    fnView(postId, categoryId) {
      console.log(postId);
      this.$router.push({
        path: "/board/view/" + postId + "?categoryId=" + categoryId,
      });
    },

    // change the category
    categoryChange(idx) {
      this.category = this.category_list[idx];
      this.selectedItem = "title";
      this.keyword = "";

      Api.get_category_post_list(1, idx)
        .then((res) => {
          this.posts = res.data.posts;
          this.currPage = res.data.currPageNum;
          this.totalPage = res.data.totalPageNum;
        })
        .catch((error) => {
          console.log("error occured!: ", error);
        });
    },

  },
};
</script>

<style scoped>
.tbList {
  border-collapse: initial;
  width: 100%;
}
.tbList th {
  border-top: 1px solid #888;
}
.tbList th,
.tbList td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbList td.txt_left {
  text-align: left;
}
.btnRightWrap {
  text-align: right;
  margin: 10px 0 0 0;
}

.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
.first,
.prev,
.next,
.last {
  border: 1px solid #666;
  margin: 0 5px;
}
.pagination span {
  display: inline-block;
  padding: 0 5px;
  color: #333;
}
.pagination a {
  text-decoration: none;
  display: inline-blcok;
  padding: 0 5px;
  color: #666;
}

.row + .row {
  margin-top: 10px;
}

.theme--light.v-input {
  margin-left: 0px;
}

.title {
  display: flex;
  font-size: 1rem !important;
  cursor: pointer;
}

.hashtag {
  display: flex;
  font-size: smaller;
}
</style>