<template>
    <v-app>
        <div class="container pt-lg-md" style="min-height: 800px">
            <div class="row justify-content-center">
                <div class="col-lg-2">
                    <v-select
                        :items="selectItems"
                        label="전체"
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
                                v-model="selectedItem"
                                color="primary"
                            >
                                <v-list-item
                                    v-for="(item, i) in categoryItems"
                                    :key="i"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-sheet>
                </div>
                <div class="col-lg-8">
                    <div class="row justify-content-right">
                        <div class="col-lg-10">
                            <h4>전체 글</h4>
                        </div>
                        <div class="col-lg-2 text-right">
                            <v-btn
                            color="primary"
                            elevation="2"
                            outlined
                            v-on:click="newPost"
                            >글쓰기</v-btn>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="tbList">
                                <colgroup>
                                    <col width="80%" />
                                    <col width="10%" />
                                    <col width="10%" />
                                </colgroup>
                                <tr v-for="(row, idx) in list" :key="idx">
                                    <td class="text-left" style="cursor:pointer;" @click="fnView(`${row.id}`)">{{row.subject}}</td>
                                    <td>{{row.name}}</td>
                                    <td style="text-align: right; padding-right: 5px;">{{row.regdate.substring(0,10)}}</td>
                                </tr>
                                <tr v-if="list.length == 0">
                                    <td colspan="4">데이터가 없습니다.</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="text-center">
                            <v-pagination
                            v-model="page"
                            :length="6"
                            color="#0D47A1"
                            ></v-pagination>
                        </div>
                    </div>                 
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        keyword: '',
        list: [
            { id: '1', subject: '제목1', name: '김민주', regdate: '2021-10-10'},
            { id: '2', subject: '제목2', name: '김민주', regdate: '2021-10-10'},
            { id: '3', subject: '제목3', name: '김민주', regdate: '2021-10-10'},
            { id: '4', subject: '제목4', name: '김민주', regdate: '2021-10-10'},
        ],
        selectedItem: 0,
        hint: '키워드를 입력하세요',
        select: { text:'제목', value: 0 },
        selectItems: [
            '제목',
            '제목+내용',
            '해시태그',
            '작성자',
        ],
        categoryItems: [
            { text: '전체 글' },
            { text: 'Book Study' },
            { text: 'Team Project' },
            { text: '공유 북마크' },
        ],
        page: 1,
    }),
    methods: {
        // Search the keyword
        searchIcon() {
            alert(this.keyword)
        },

        // create a new post
        newPost: function (event) {
            this.$router.push({path: './new/'});
        },

        // move to the detail page
        fnView(id){
            console.log(id);
			this.$router.push({path:'./view/' + id});
        },
    },
}
</script>

<style scoped>
    .tbList {border-collapse: initial; width: 100%;}
	.tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:10px 0 0 0;}

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
</style>