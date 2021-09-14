<template>
    <div class="container">
        <div class="row">
            <el-calendar v-model="value">
            </el-calendar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: new Date()
            }
        }
    }
</script>

<style>
</style>