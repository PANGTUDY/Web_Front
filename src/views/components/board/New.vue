<template>
  <v-app>
    <div class="container pt-lg-sd" style="min-height: 800px">
      <div class="row justify-content-center">
        <div class="col-lg-8 pb-0 text-right">
          <v-btn
            elevation="2"
            color="primary"
            depressed
            outlined
            class="mr-2"
            @click="cancel()"
            >취소</v-btn
          >
          <v-btn
            elevation="2"
            color="primary"
            depressed
            outlined
            @click="submit"
            >저장</v-btn
          >
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-lg-8 pt-0 mb-8">
          <v-select
            :items="categoryItems"
            v-model="category"
            label="카테고리"
            single-line
            class="category"
          ></v-select>
          <v-text-field
            v-model="title"
            placeholder="제목을 입력하세요"
            hide-details="auto"
            type="text"
            class="input_title"
          >
          </v-text-field>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 pt-0 mb-0">
          <TipTap
            :options="options"
            :content="content"
            style="margin-bottom: 5px"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 pt-0 mt-5">
          <v-combobox
            v-model="hashtag"
            :search-input.sync="search"
            style="margin-left: 0px; vertical-align: baseline"
            dense
            prepend-icon="mdi-pound"
            append-icon=""
            placeholder="해시태그"
            no-data-text="해시태그"
            clearable
            multiple
            deletable-chips
            chips
          >
          </v-combobox>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 pt-0 mt-2">
          <v-file-input
            v-model="files"
            style="margin-left: 0px"
            multiple
            show-size
            truncate-length="15"
          ></v-file-input>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import * as Api from "@/api/board.js";
import TipTap from "@/components/TipTap";
export default {
  components: {
    TipTap,
  },

  data: () => ({
    title: "",
    postId: "",

    category_list: [],
    category: "",
    categoryItems: [],

    options: {
      content: "",
      editable: true,
    },
    content: "",

    files: [],

    hashtag: [],
    search: null,
  }),

  created() {
    // 수정 케이스
    this.postId = this.$route.params.id;

    if (this.postId) {
      Api.get_post_list(this.postId).then(res => {
        var post = res.data;
        this.title = post.title;
        this.$set(this.options, "content", post.contents);
        this.content = post.contents;
        this.options.content = post.contents;

        console.log("created: ", this.content, this.options);

        this.category = post.category.categoryId;
        this.hashtag = post.tags.split(",");
      });
    }
  },

  mounted() {
    // 카테고리 전체 목록 불러오는 Api
    Api.get_category_list()
      .then(res => {
        this.category_list = res.data;

        this.category_list.sort(function (a, b) {
          return a.categoryId - b.categoryId;
        });

        this.category_list.map(item => {
          let category = {};

          category["value"] = item["categoryId"];
          category["text"] = item["categoryName"];

          this.categoryItems.push(category);
        });
      })
      .catch(error => {
        console.log("error occured!: ", error);
      });

    // // 수정 케이스
    // this.postId = this.$route.params.id;

    // if(this.postId) {
    //   Api.get_post_list(this.postId).then(res => {
    //     var post = res.data;
    //     this.title = post.title;
    //     this.$set(this.options, 'content', post.contents);
    //     this.content = post.contents;

    //     this.category = post.category.categoryId;
    //     this.hashtag = post.tags.split(',');
    //   })
    // }
  },

  methods: {
    // submit the post
    submit() {
      if (this.category == "") {
        alert("카테고리 입력이 필요합니다.");
        return;
      }
      var post = {
        categoryId: this.category,
        tags: this.hashtag.join(),
        title: this.title,
        contents: this.options.content,
        date:
          new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0] +
          " " +
          new Date().toTimeString().split(" ")[0],
        writer: "김민주", // TODO: Change to this.$store.state.authInfo.id
      };

      console.log(post);

      if (!this.postId) {
        // new post
        // Submit the post
        Api.create_post(post)
          .then(res => {
            // When attached the file
            if (this.files) {
              console.log("file exist!");
              const fd = new FormData();
              fd.append("ufile", this.files);
              // for (let i in this.files) {
              //   fd.append("ufile", this.files[i]);
              // }
              // Submit the files
              Api.upload_file(res.data.postId, fd)
                .then(resizeBy => {
                  console.log("Save the file! ", res.data);
                })
                .catch(error => {
                  console.log("error occured!: ", error);
                });
            }

            // Check the success
            console.log(res.data);
            debugger;
            alert("저장되었습니다");
            this.$router.push({ path: "/board/list/" });
          })
          .catch(error => {
            console.log("error occured!: ", error);
          });
      } else {
        // edit post
        Api.patch_post(this.postId, post)
          .then(res => {
            alert("수정되었습니다");
            this.$router.push({ path: "/board/list/" });
          })
          .catch(error => {
            console.log("error occured!: ", error);
          });
      }
    },

    // cancel to create a post
    cancel() {
      this.$router.go(-1); // go back to list
    },
  },
};
</script>

<style scoped>
.category {
  width: 20%;
  display: flex;
  float: left;
  margin-left: 0px;
}

.input_title {
  width: 75%;
  display: flex;
  float: right;
  margin-left: 0px;
}

/* .padding0 {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  .padding0 > .v-input {
    padding-top: 0px;
  } */
</style>
