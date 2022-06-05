<template>
  <v-app>
    <div class="container pt-lg-sd" style="min-height: 800px">
      <div class="row justify-content-center vertical-center mt-5">
        <div class="col-lg-1 txt_bar">
          {{ category }}
        </div>

        <div class="col-lg-4 text-left">{{ post.title }}</div>
        <div class="col-lg-1 text-center txt_bar" style="font-size: 0.9em">
          {{ post.writer }}
        </div>
        <div class="col-lg-1" style="font-size: 0.9em">
          {{ post.date.substr(0, 10) }}
        </div>

        <div class="col-lg-1 text-right">
          <template>
            <v-menu offset-y left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                  style="padding: 0px; outline: none; width: initial"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="editPost">
                  <v-list-item-title>수정</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteDialog = true">
                  <v-list-item-title>삭제</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </div>
      </div>

      <v-dialog v-model="deleteDialog" max-width="300" min-height="200">
        <v-card>
          <v-card-title class="text-h6"> 삭제하시겠습니까? </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="deleteDialog = false">
              아니오
            </v-btn>

            <v-btn color="green darken-1" text @click="deletePost"> 네 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="row justify-content-center" style="margin-top: 0px">
        <div class="col-lg-8 AddWrap">
          <form>
            <table class="tbAdd" width="100%">
              <tr>
                <td colspan="2" class="txt_cont" v-html="post.contents"></td>
              </tr>
              <tr style="border-top-style: hidden">
                <th width="15%">공감</th>
                <td width="85%">
                  <HeartButton
                    :likes="this.likes"
                    :liked="this.liked"
                    @setInput="setLike"
                  ></HeartButton>
                </td>
              </tr>
              <tr class="attach">
                <th width="15%">첨부파일</th>
                <td width="85%">사진.zip</td>
              </tr>
              <tr class="tag">
                <th width="15%">태그</th>
                <td width="85%">
                  <v-chip
                    color="blue lighten-2"
                    outlined
                    v-for="(tag, index) in post.tags.split(',')"
                    :key="index"
                    style="margin-right: 10px"
                  >
                    {{ tag }}
                  </v-chip>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="another-category col-lg-8">
          <h4 class="categoryTitle">
            <span>{{ category }}</span> 카테고리의 다른 글
          </h4>
          <table class="postList">
            <tbody>
              <tr v-for="(post, idx) in postList" :key="idx">
                <th>
                  <router-link
                    tag="a"
                    :to="{
                      path: `/board/view/${post.postId}`,
                      query: { categoryId: `${post.categoryId}` },
                    }"
                    :class="{ focus: isFocus(post.postId) }"
                  >
                    {{ post.title }}
                  </router-link>
                </th>
                <td>
                  {{ post.date.substr(0, 10) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="comments != null" class="row justify-content-center">
        <div class="col-lg-8 comment_area">
          <template v-for="(item, index) in comments">
            <v-card :key="index" class="mx-auto" style="box-shadow: none">
              <v-container style="display: inline-block">
                <v-card-title>
                  <v-list two-line width="100%">
                    <v-list-item class="vertical-center">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                          class="elevation-6"
                          alt=""
                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.writer }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-content>
                        <v-row class="comment_date" text-left justify="end">
                          <div style="padding: 7px; min-width: 110px;">
                            {{ item.date.substr(0, 10) }}
                          </div>

                          <v-menu
                            offset-y
                            left
                            bottom
                            style="display: none"
                            v-if="userId === item.writer"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                style="
                                  padding: 0px;
                                  outline: none;
                                  width: initial;
                                "
                              >
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>

                            <v-list>
                              <v-list-item @click="editComment(index)">
                                <v-list-item-title>수정</v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                @click="deleteComment(item.commentId)"
                              >
                                <v-list-item-title>삭제</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-title>

                <v-card-subtitle class="content">
                  <span v-if="!item.edit" class="subheading ml-3 mr-2">
                    {{ item.contents }}
                  </span>

                  <div v-else class="input_content">
                    <v-textarea
                      v-model="item.contents"
                      hide-details
                      auto-grow
                      outlined
                      rows="2"
                      row-height="15"
                      class="textarea"
                    >
                    </v-textarea>

                    <div class="content_btn">
                      <v-btn
                        outlined
                        depressed
                        color="gray"
                        style="margin-right: 5px"
                        @click="cancelEditComment(index)"
                      >
                        취소
                      </v-btn>
                      <v-btn
                        outlined
                        depressed
                        color="primary"
                        @click="submitComment(index)"
                      >
                        등록
                      </v-btn>
                    </div>
                  </div>
                </v-card-subtitle>
              </v-container>
            </v-card>
          </template>
        </div>
      </div>

      <div class="row justify-content-center mt-0">
        <div class="col-lg-8 pt-0">
          <v-textarea
            placeholder="댓글을 입력해주세요."
            no-resize
            rows="3"
            background-color="grey lighten-4"
            color="black"
            class="comment"
            style="line-height: normal; display: contents"
            v-model="comment"
          ></v-textarea>
          <div style="display: block; float: right">
            <v-btn outlined depressed color="primary" @click="submit">
              등록
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"

import * as Api from "@/api/board.js"
import HeartButton from "@/components/HeartButton"

export default {
  components: { HeartButton },
  data: () => ({
    userId: "",
    liked: true,

    postId: "",
    categoryId: "",
    category: "",
    subject: "",
    view: "",

    post: {},
    comments: [],
    likes: 0,

    comment: "",

    deleteDialog: false,
    editDialog: false,

    postList: [],
  }),

  mounted() {
    this.postId = this.$route.params.id
    this.categoryId = this.$route.query.categoryId

    // 추후 getters 사용으로 변경 예정
    if (this.$store.state.authInfo != null) {
      this.userId = this.$store.state.authInfo.id
    } else {
      // 임시
      this.userId = 1
    }
    console.log("userId: ", this.userId)

    // 좋아요 누른 user 불러오는 Api
    Api.get_likes_user_list(this.postId)
      .then(res => {
        let userList = res.data
        console.log(userList)
        this.likes = userList.length
        if (userList.includes(this.userId)) {
          this.liked = true
        } else {
          this.liked = false
        }
        console.log("mounted liked: ", this.liked)
      })
      .catch(error => {
        console.log("error occured!: ", error)
      })

    this.fnInit()
  },

  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.postId = this.$route.params.id
        this.categoryId = this.$route.query.categoryId

        this.fnInit()
        // 좋아요 누른 user 불러오는 Api
        Api.get_likes_user_list(this.postId)
          .then(res => {
            let userList = res.data
            console.log("route list: ", userList)
            this.likes = userList.length
            if (userList.includes(this.userId)) {
              this.liked = true
            } else {
              this.liked = false
            }

            console.log("watch liked: ", this.liked)
          })
          .catch(error => {
            console.log("error occured!: ", error)
          })
      }
    },
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },

  methods: {
    fnInit() {
      // 특정 글 정보 불러오는 Api
      Api.get_post_list(0, this.postId)
        .then(res => {
          this.post = res.data
          this.category = this.post.category.categoryName
          this.comments = res.data.comments

          if (this.comments != null) {
            for (let comment of this.comments) {
              comment._contents = comment.contents
              this.$set(comment, "edit", false)
            }
          }
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })

      Api.get_adjacent_list(this.categoryId, this.postId)
        .then(res => {
          this.postList = res.data
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })
    },

    isFocus(id) {
      if (this.postId == id.toString()) {
        return true
      } else {
        return false
      }
    },

    setLike() {
      Api.change_like(this.postId, this.userId)
        .then(res => {
          this.likes = res.data
          this.liked = !this.liked
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })
    },

    submit() {
      var comment = {
        writer: "minju", // TODO: change to the user info
        contents: this.comment,
        date:
          new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0] +
          " " +
          new Date().toTimeString().split(" ")[0],
        postId: this.postId,
      }

      Api.create_comment(comment)
        .then(res => {
          console.log("저장되었습니다")
          Api.get_comments(this.postId)
            .then(result => {
              this.comments = result.data

              for (let comment of this.comments) {
                comment.edit = false
              }
            })
            .catch(error => {
              console.log("error occured!: ", error)
            })
          this.comment = ""
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })
    },

    editPost() {
      this.$router.push({
        name: "new",
        params: { id: this.postId },
      })
    },

    deletePost() {
      Api.delete_post(this.postId)
        .then(() => {
          console.log("삭제되었습니다")
          this.$router.push({ path: "/board/list/" })
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })
    },

    editComment(index) {
      this.$set(this.comments[index], "edit", true)
      //this.$forceUpdate()
      console.log(this.comments)
    },

    deleteComment(commentId) {
      Api.delete_comment(this.postId, commentId)
        .then(() => {
          Api.get_comments(this.postId)
            .then(result => {
              this.comments = result.data

              if (this.comments != null) {
                for (let comment of this.comments) {
                  comment._contents = comment.contents
                  comment.edit = false
                }
              }
            })
            .catch(error => {
              console.log("error occured!: ", error)
            })
        })
        .catch(error => {
          console.log("error occured!: ", error)
        })
    },

    cancelEditComment(index) {
      this.comments[index].contents = this.comments[index]._contents
      this.$set(this.comments[index], "edit", false)
      // this.$forceUpdate()
    },

    submitComment(index) {
      let content = {
        writer: "김민주", // TODO: change to the user info
        contents: this.comments[index].contents,
        date:
          new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0] +
          " " +
          new Date().toTimeString().split(" ")[0],
        postId: this.postId,
      }

      Api.patch_comment(
        this.postId,
        this.comments[index].commentId,
        content,
      ).then(res => {
        Api.get_comments(this.postId)
          .then(result => {
            this.comments = result.data

            if (this.comments != null) {
              for (let comment of this.comments) {
                comment._contents = comment.contents
                this.$set(comment, "edit", false)
              }
            }
          })
          .catch(error => {
            console.log("error occured!: ", error)
          })
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/minju";

.row + .row {
  margin-top: 10px;
  margin-bottom: 0px;
}

textarea {
  padding: 0 10px !important;
}

.txt_bar {
  margin-bottom: 0px;
  border-right: solid 2px lightgray;
  padding: 0px;
  text-align: center;
}

.tbAdd {
  border-top: 1px solid #888;
}
.tbAdd th,
.tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
}
.tbAdd td.txt_cont {
  height: 300px;
  vertical-align: top;
}
.tbAdd tr.attach {
  min-height: 50px;
  vertical-align: center;
}
.tbAdd tr.tag {
  min-height: 50px;
  vertical-align: center;
}
.btnWrap {
  text-align: center;
  margin: 20px 0 0 0;
}
.btnWrap a {
  margin: 0 10px;
}
.btnAdd {
  background: #43b984;
}
.btnDelete {
  background: #f00;
}

.comment_date {
  font-size: 14px;
  font: initial;
}

.ma-2 {
  margin-right: 5px;
  border-color: #bbdefb;
}

.like {
  padding: 0px 12px;
}

.vertical-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-text-field__details {
  display: none !important;
}

.focus {
  text-decoration: underline !important;
  color: #6d6969 !important;
  font-weight: bold;
}
</style>
