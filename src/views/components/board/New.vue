<template>
  <div class="container pt-lg-sd" style="min-height: 800px">
    <div class="row justify-content-center">
      <div class="col-lg-2">
        <v-select
          :items="categoryItems"
          label="카테고리"
          single-line
        ></v-select>
      </div>
      <div class="col-lg-6">
        <v-text-field
          placeholder="제목을 입력하세요"
          hide-details="auto"
          type="text"
        >
        </v-text-field>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <TipTap
          :options="options"
          style="margin-bottom: 0px;"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <v-combobox
          v-model="model"
          :search-input.sync="search"
          placeholder="해시태그"
          clearable
          multiple
          deletable-chips
          chips
        >
           <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-input__append-inner {
  display: none;
}
</style>

<script>
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