<template>
  <v-app>
    <div class="container pt-lg-sd" style="min-height: 800px">
      <div class="row justify-content-center">
        <div class="col-lg-8 pb-0" align="right">
          <v-btn
            elevation="2"
            color="primary"
            depressed
            outlined
            class="mr-2"
            @click="cancel()"
          >취소</v-btn>
          <v-btn
            elevation="2"
            color="primary"
            depressed
            outlined
            @click="save()"
          >저장</v-btn>
        </div>
      </div>
      <div class="row justify-content-center" style="margin-top: auto;">
        <div class="col-lg-8 pt-0" style="margin-bottom: 30px;">
          <v-select
            :items="categoryItems"
            label="카테고리"
            single-line
            class="category"
          ></v-select>
          <v-text-field
            placeholder="제목을 입력하세요"
            hide-details="auto"
            type="text"
            class="input_title"
          >
          </v-text-field>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 pt-0">
          <TipTap
            :options="options"
            style="margin-bottom: 5px;"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 pt-0 mt-5">
          <v-combobox
            v-model="model"
            :search-input.sync="search"
            style="margin-left: 0px; vertical-align: baseline;"
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
        <div class="col-lg-8 pt-0 mt-3">
          <v-file-input
            style="margin-left: 0px;"
            multiple
            show-size
            truncate-length="15"
          ></v-file-input>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.padding0 {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.padding0 > .v-input {
  padding-top: 0px;
}
</style>

<script>
import * as Api from '@/api/board.js';
import TipTap from '@/components/TipTap'
export default {
  components: {
    TipTap
  },
  
  data: () => ({
    category_list: [],
    category: '',
    categoryItems: [],

    options: {
      content: '',
      editable: true,
    },

    model: [],
    search: null,
  }),

  mounted() {
    // 카테고리 전체 목록 불러오는 Api
    Api.get_category_list().then(data => {
        this.category_list = data.data;

        this.category_list.sort(function(a, b) {
            return a.categoryId - b.categoryId;
        });
        this.category = this.category_list[0];
        console.log(this.category_list);

        this.category_list.map(item => {
          let category = {};

          category['value'] = item['categoryId'];
          category['text'] = item['categoryName'];

          this.categoryItems.push(category);
        })

        console.log(this.categoryItems);
    })
    .catch(error => {
        console.log("error occured!: ", error);
    });
  },

  methods: {
    // save the post
    save() {

    },

    // cancel to create a post
    cancel() {
      this.$router.go(-1); // go back to list
    },
  },
}
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
</style>