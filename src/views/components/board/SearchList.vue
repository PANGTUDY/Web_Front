<template>
    <div class="container px-lg-5 py-lg-5">
        <div class="row justify-content-center">
            <div class="col-xl-2">
                <select v-model="selected" class="dropdown-toggle" style="width: 100%;">
                    <option class="dropdown-item" selected>제목</option>
                    <option class="dropdown-item">제목+내용</option>
                    <option class="dropdown-item">해시태그</option>
                    <option class="dropdown-item">작성자</option>
                </select>
            </div>
            <div class="col-xl-10"><span><base-input placeholder="키워드를 입력하세요" addon-right-icon="ni ni-zoom-split-in"></base-input></span></div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-2" style="border:solid 1px gray;">
                <ul id="array-rendering">
                    <li>
                        Book Study
                    </li>
                     <li>
                        Team Project
                    </li>
                    <li>
                        공유 북마크
                    </li>
                </ul>
            </div>
            <div class="col-xl-10">

            </div>
        </div>
    </div>
</template>

<script>
export default {
	
}
</script>

<style scoped>

</style>