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
          >취소</v-btn>
          <v-btn
            elevation="2"
            color="primary"
            depressed
            outlined
          >저장</v-btn>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-2 pt-0">
          <v-select
            :items="categoryItems"
            label="카테고리"
            single-line
          ></v-select>
        </div>
        <div class="col-lg-6 pt-0">
          <v-text-field
            placeholder="제목을 입력하세요"
            hide-details="auto"
            type="text"
          >
          </v-text-field>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 padding0">
          <TipTap
            :options="options"
            style="margin-bottom: 5px;"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 padding0">
          <v-combobox
            v-model="model"
            :search-input.sync="search"
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
        <div class="col-lg-8 padding0">
          <v-file-input
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
    categoryItems: [
      { text: '선택 없음' },
      { text: 'Book Study' },
      { text: 'Team Project' },
      { text: '공유 북마크' },
    ],

    options: {
      content: '',
      editable: true,
    },

    model: [],
    search: null,
  }),

}
</script>