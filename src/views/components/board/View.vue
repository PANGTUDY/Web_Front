<template>
  <v-app>
    <div class="container pt-lg-sd" style="min-height: 800px">
      <div class="row justify-content-center vertical-center mt-5">
        <div class="col-lg-1 txt_bar">
            {{ category }}
        </div>
        
        <div class="col-lg-4 text-left">{{ post.title }}</div>
        <div class="col-lg-1 text-center txt_bar">
          {{ post.writer }}
        </div>
        <div class="col-lg-1">{{ post.date.substr(0,10) }}</div>

        <div class="col-lg-1 text-right">
          <template>
            <v-menu offset-y left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" style="padding: 0px; outline: none; width: initial;">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="editPost">
                  <v-list-item-title>수정</v-list-item-title>
                </v-list-item>
                <v-list-item  @click="deleteDialog = true">
                  <v-list-item-title>삭제</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </div>
      </div>

      <v-dialog
        v-model="deleteDialog"
        max-width="300"
        min-height="200"
      >
        <v-card>
          <v-card-title class="text-h6">
            삭제하시겠습니까?
          </v-card-title>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              color="green darken-1"
              text
              @click="deleteDialog = false"
            >
              아니오
            </v-btn>
  
            <v-btn
              color="green darken-1"
              text
              @click="deletePost"
            >
              네
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="row justify-content-center" style="margin-top: 0px;">
        <div class="col-lg-8 AddWrap">
          <form>
            <table class="tbAdd" width="100%">
              <tr>
                <td colspan="2" class="txt_cont" v-html="post.contents"></td>
              </tr>
              <tr style="border-top-style: hidden;">
                <th width="15%">공감</th>
                <td width="85%">
                  <HeartButton :likes="this.likes" @setInput="setLike"></HeartButton>
                  <span class="subheading ml-2">{{ likes }}</span>
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
                    style="margin-right: 10px;"
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
        <div class="col-lg-8">
          <v-card class="mx-auto">
            <template v-for="(item, index) in comments">
              <v-card-title :key="index">
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
                        <div style="padding: 7px;">
                          {{ item.date.substr(0,10) }}
                        </div>

                          <v-menu offset-y left bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn text v-bind="attrs" v-on="on" style="padding: 0px; outline: none; width: initial;">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>

                            <v-list>
                              <v-list-item @click="editComment(item.commentId)">
                                <v-list-item-title>수정</v-list-item-title>
                              </v-list-item>
                              <v-list-item  @click="deleteComment(item.commentId)">
                                <v-list-item-title>삭제</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                      </v-row>
                    </v-list-item-content>

                  </v-list-item>
                </v-list>
              </v-card-title>

              <v-card-subtitle :key="index">
                <span class="subheading ml-3 mr-2">
                  {{ item.contents }}
                </span>
              </v-card-subtitle>
            </template>
          </v-card>
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
            style="line-height: normal; display: contents;"
            v-model="comment"
          ></v-textarea>
          <div style="display: block; float: right;">
            <v-btn
              outlined
              depressed
              color="primary"
              @click="submit"
            >
              등록
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import * as Api from '@/api/board.js';
import HeartButton from '@/components/HeartButton';

export default {
  components: { HeartButton },
  data: () => ({
    postId: "",
    category: "",
    subject: "",
    view: "",

    post: {},
    comments: [],
    likes: 0,

    comment: "",

    deleteDialog: false,
    editDialog: false,
  }),

  mounted() {
    this.postId = this.$route.params.id;
    // 특정 글 정보 불러오는 Api
    Api.get_post_list(this.postId).then(res => {
        this.post = res.data;
        this.category = this.post.category.categoryName;
        this.comments = res.data.comments;

        this.likes = this.post.likes;
    })
    .catch(error => {
        console.log("error occured!: ", error);
    });
  },

  methods: {
    fnGetView() {
      this.$axios
        .get("http://localhost:3000/api/board/" + this.body.num, {
          params: this.body,
        })
        .then((res) => {
          this.view = res.data.view[0];
          this.subject = this.view.subject;
          this.cont = this.view.cont.replace(/(\n)/g, "<br/>");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fnList() {
      delete this.body.num;
      this.$router.push({ path: "./list", query: this.body });
    },

    dialogOpen(kind) {
      console.log("dialogOpen()...", kind);
      if (kind === "login") {
        this.dialog.login = true;
      } else if (kind === "register") {
        this.dialog.register = true;
      } else if (kind === "pwdchg") {
        this.dialog.pwdchg = true;
      }
    },

    setLike(likes) {
      console.log(likes);
      this.likes = likes;
    },

    submit() {
      var comment = {
        "writer": "minju", // TODO: change to the user info
        "contents": this.comment,
        "date": new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0] + ' ' + new Date().toTimeString().split(" ")[0],
        "postId": this.postId,
      };

      Api.create_comment(comment).then(res => {
        console.log("저장되었습니다");
        Api.get_comments(this.postId).then(result => {
          console.log(this.postId);
          console.log(result.data);
          this.comments = result.data;
        })
        .catch(error => {
          console.log("error occured!: ", error);
        });
        this.comment = "";
      })
      .catch(error => {
        console.log("error occured!: ", error);
      });
    },

    editPost() {
      alert("Clicked the edit button");
    },

    deletePost() {
      Api.delete_post(this.postId).then(res => {
        console.log("삭제되었습니다");
        this.$router.push({path: '/board/list/'});
      })
      .catch(error => {
        console.log("error occured!: ", error);
      });
    },

    editComment() {
      alert("Clicked the edit button");
    },

    deleteComment(commentId) {
      Api.delete_comment(this.postId, commentId).then(res => {
        Api.get_comments(this.postId).then(result => {
          console.log(this.postId);
          console.log(result.data);
          this.comments = result.data;
        })
        .catch(error => {
          console.log("error occured!: ", error);
        });
      })
      .catch(error => {
        console.log("error occured!: ", error);
      });
    },
  },
};
</script>

<style scoped>
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
</style>