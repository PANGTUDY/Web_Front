<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <el-calendar v-model="selectDate">
                    <template slot="dateCell" slot-scope="{date, data}">
                        <div>
                            <p :class="data.isSelected ? 'is-selected' : ''" >
                                {{ date.getDate() }}
                            </p>
                        </div>
                    </template>
                </el-calendar>
            </div>
            <div class="col-lg-3">
                <div class="row py-3 align-items-center">
                    <h6 class="mb-0"> {{ this.year }}.{{ this.month }}.{{ this.day }} </h6>
                </div>
            
                <el-card shadow="never">
                   <el-row>
                       <el-col :span="24"><div class="grid-content bg-purple-light">Contents 1</div></el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="24"><div class="grid-content bg-purple-light">Contents 2</div></el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="24"><div class="grid-content bg-purple-light">Contents 3</div></el-col>
                   </el-row>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectDate: new Date(),
                count: 10
            }
        },
        computed: {
            year() {
                return this.selectDate.getFullYear();
            },
            month() {
                return this.selectDate.getMonth();
            },
            day() {
                return this.selectDate.getDate();
            }
        },
        methods: {
            test(data, date) {
                alert(data + "\n" + date);
            }
        }
    }
</script>

<style>
 .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-light {
    background: #DAF1DB;
  }
  .grid-content {
    border-radius: 7px;
    padding: 10px;
  }
</style>