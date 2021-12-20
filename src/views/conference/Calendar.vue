<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <el-calendar v-model="select_date">
                    <template slot="dateCell" slot-scope="{date, data}">
                        <div>
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{ date.getDate() }}
                            </p>
                            <div v-if="calendar[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()] !== undefined">
                                <!-- 일정이 2개 이하라면 -->
                                <div v-if="calendar[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()].length <= 2">
                                    <el-row v-for="item in calendar[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()]" :key="item.id" :gutter="12">
                                        <el-col :span="24">
                                            <div class="grid-content-xs bg-purple-light">
                                                <b style="font-size: 12px"> {{ item.startTime.slice(0, 5) }} {{ item.comment }} </b> 
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 아니라면 more 로 표기 -->
                                <div v-else>
                                    <el-row v-for="item in calendar[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()].slice(0, 2)" :key="item.id" :gutter="12">
                                        <el-col :span="24">
                                            <div class="grid-content-xs bg-purple-light">
                                                <b style="font-size: 12px"> {{ item.startTime.slice(0, 5) }} {{ item.comment }} </b> 
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col style="text-align: center">
                                            <b style="font-size: 12px"> more... </b>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-calendar>
            </div>
            <div class="col-lg-3">
                <div class="row py-3" style="margin-bottom: 10px">
                    <h5 class="mb-0"> {{ this.year }}.{{ this.month }}.{{ this.day }} </h5>
                </div>
                <v-card elevation="2">
                    <!-- <v-row v-if="this.calendar[this.year + '-' + this.month + '-' + this.day] === undefined">
                        <v-col>
                            <v-card style="margin-left: 10px; margin-right: 10px;">
                                <v-card-text>
                                    Empty Schedule!
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row> -->
                    <v-row v-for="item in this.calendar[this.year + '-' + this.month + '-' + this.day]" :key="item.id">
                        <v-col>
                            <v-card color="#DAF1DB" style="margin-left: 10px; margin-right: 10px;">
                                <v-card-title class="text-h5">
                                    {{ item.title }}
                                </v-card-title>
                                <v-card-subtitle>
                                    <b> {{ item.startTime.slice(0, 5) }} ~ {{ item.endTime.slice(0, 5) }} </b>
                                </v-card-subtitle>
                                <v-card-text>
                                    {{ item.comment }}
                                    <div style="text-align: right">
                                        <v-btn icon x-small><v-icon>{{ icons.mdiPencil }}</v-icon></v-btn> &nbsp;
                                        <v-btn icon x-small><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn> 
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card style="text-align: center; font-size: 20px; margin-left: 10px; margin-right: 10px;" @click="hello()">
                                <b> + </b>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
        <v-snackbar v-model="change">
            데이터 변경이 감지되었습니다.

            <template v-slot:action="{ attrs }">
                <v-btn color="pink"
                        text
                        v-bind="attrs"
                        @click="change = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import Modal from "@/components/Modal.vue";
    import {
        mdiPencil, mdiDelete
    } from '@mdi/js';

    export default {
        components: {
            Modal
        },
        data() {
            return {
                select_date: new Date(),
                change: false,
                sse_source: null,
                icons: {
                    mdiPencil,
                    mdiDelete
                }
            }
        },
        computed: {
            year() {
                return this.select_date.getFullYear();
            },
            month() {
                return this.select_date.getMonth() + 1;
            },
            day() {
                return this.select_date.getDate();
            },
            calendar() {
                return this.$store.state.calendar;
            }
        },
        methods: {
            hello() {
                console.log("hihi");
            }
        },
        mounted() {
            this.$store.dispatch("load_calendar", this.year);
            // TODO : EventSource 주소 상수화 필요
            this.sse_source = new EventSource("http://localhost:10831/calendar/schedules/sse");
            this.sse_source.onmessage = (event) => { 
                var event_data = JSON.parse(event.data);
                if (event_data.schedule.year === this.year) {
                    if (event_data.schedule.month === this.month && event_data.schedule.day === this.day) {
                        this.change = true;
                    }
                    this.$store.dispatch("call_calendar_event", event_data);
                }
            }
        },
        beforeDestroy() {
            this.sse_source.close();
            this.sse_source = null;
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
  .grid-content-xs {
    border-radius: 7px;
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 2px;
  }
</style>