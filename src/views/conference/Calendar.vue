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
                                                <b style="font-size: 12px"> {{ time_format(item.startTime) }} {{ item.comment }} </b> 
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 아니라면 more 로 표기 -->
                                <div v-else>
                                    <el-row v-for="item in calendar[date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()].slice(0, 2)" :key="item.id" :gutter="12">
                                        <el-col :span="24">
                                            <div class="grid-content-xs bg-purple-light">
                                                <b style="font-size: 12px"> {{ time_format(item.startTime) }} {{ item.comment }} </b> 
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
                                    <b> {{ time_format(item.startTime) }} ~ {{ time_format(item.endTime) }} </b>
                                </v-card-subtitle>
                                <v-card-text>
                                    {{ item.comment }}
                                    <div style="text-align: right">
                                        <v-btn icon x-small @click="modify_schedule(item)"><v-icon>{{ icons.mdiPencil }}</v-icon></v-btn> &nbsp;
                                        <v-btn icon x-small @click="delete_schedule(item)"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn> 
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card style="text-align: center; font-size: 20px; margin-left: 10px; margin-right: 10px;" @click="add_schedule()">
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
        <v-dialog v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar
                    dark
                    color="dark"
                    >
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>일정 등록</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn text @click="schedule_dialog_clear()">
                            Clear
                        </v-btn>
                        <v-btn text @click="schedule_dialog_save()">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-list-item>
                        <v-text-field
                            v-model="schedule_title"
                            label="Title"
                            :rules="schedule_title_rules"
                            hide-details="auto">
                        </v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                <v-menu
                                    ref="menu1"
                                    v-model="start_time"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="schedule_start"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="schedule_start"
                                            label="Start Time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on" />
                                    </template>
                                    <v-time-picker
                                        v-if="start_time"
                                        v-model="schedule_start"
                                        format="ampm"
                                        ampm-in-title
                                        @click:minute="$refs.menu1.save(schedule_start)" />
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                    ref="menu2"
                                    v-model="end_time"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="schedule_end"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="schedule_end"
                                            label="End Time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on" />
                                    </template>
                                    <v-time-picker
                                        v-if="end_time"
                                        v-model="schedule_end"
                                        format="ampm"
                                        ampm-in-title
                                        @click:minute="$refs.menu2.save(schedule_end)" />
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-list-item>
                    <v-list-item>
                        <v-select
                            v-model="schedule_select_members"
                            :items="members"
                            label="Participants"
                            :menu-props="{ offsetY: true }"
                            clearable
                            multiple
                            chips
                            dense>
                            <template v-slot:selection="data">
                                <v-chip
                                    :key="JSON.stringify(data.item)"
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    @click:close="data.parent.selectItem(data.item)">
                                    <v-avatar
                                        class="accent white--text"
                                        left
                                        v-text="data.item.slice(0, 1).toUpperCase()"/>
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-select>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox v-model="schedule_is_alram" 
                                label="Alram"/>
                        <v-spacer></v-spacer>
                        <v-select 
                                v-if="schedule_is_alram"
                                v-model="schedule_select_time"
                                :items="time_list"
                                label="Time"
                                :menu-props="{ offsetY: true }"
                                dense/>
                    </v-list-item>
                    <v-list-item>
                        <v-textarea
                            v-model="scehdule_comment"
                            filled
                            name="input-7-4"
                            auto-grow
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Comment"
                            value="Sample Data" />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Modal from "@/components/Modal.vue";
    import {
        mdiPencil, mdiDelete
    } from '@mdi/js';
    import * as Api from '@/api/conference';
    import Swal from 'sweetalert2';

    export default {
        components: {
            Modal
        },
        data() {
            return {
                select_date: new Date(),
                change: false,
                dialog: false,
                sse_source: null,
                icons: {
                    mdiPencil,
                    mdiDelete
                },
                is_modify: false,
                modify_id: 0,

                /* 
                    Schedule Add Dialog 관련 변수
                */
                schedule_title: '',
                schedule_title_rules: [
                    value => !!value || 'Required.',
                    value => (value && value.length >= 3) || 'Min 3 characters',
                ],
                schedule_start: null,
                schedule_end: null,
                start_time: false,
                end_time: false,
                schedule_select_members: [],
                // TODO : 회원목록 읽어오기 (User-API)
                members: [
                    '박찬준',
                    '원철황',
                    '김민주',
                    '박혜원',
                    '서진하',
                    '임재창'
                ],
                schedule_is_alram: false,
                time_list: ['15분전', '30분전', '1시간전', '2시간전', '하루전'],
                schedule_select_time: [],
                scehdule_comment: ''
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
        watch: {
            year: function(year) {
                this.$store.dispatch("load_calendar", year);
            }
        },
        methods: {
            add_schedule() {
                this.schedule_dialog_clear();
                this.modify = false;
                this.dialog = true;
            },
            schedule_dialog_save() {
                var schedule = {
                    "year": this.year,
                    "month": this.month,
                    "day": this.day,
                    "title": this.schedule_title,
                    "startTime": this.schedule_start,
                    "endTime": this.schedule_end,
                    "writer": "박찬준",
                    "alarm": 0,
                    "comment": this.scehdule_comment
                };
                
                if (this.modify) {
                    schedule['id'] = this.modify_id;
                    Api.modify_schedule(schedule).then(data => {
                        this.$store.dispatch('modify_schedule', data.data);
                    });
                } else {
                    Api.create_schedule(schedule).then(data => {
                        console.log(data);
                        this.$store.dispatch('add_schedule', data.data);
                    });
                }
                this.schedule_dialog_clear();
                this.dialog = false;  
            },
            delete_schedule(schedule) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `You won't be able to revert this!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success btn-fill',
                    cancelButtonClass: 'btn btn-danger btn-fill',
                    confirmButtonText: 'Yes, delete it!',
                    buttonsStyling: false
                }).then(function (result) {
                    if (result.isConfirmed) {
                        Api.delete_schedule(schedule.id)
                            .then(data => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You succeeded in deleting the schedule.',
                                    icon: 'success',
                                    confirmButtonClass: 'btn btn-success btn-fill',
                                    confirmButtonText: 'OK',
                                    buttonsStyling: false
                                });
                            })
                            .catch(error => {
                                console.log("Schedule[" + schedule.id + "] Delete Exception!");
                                console.log(error);
                            });
                    }
                })
            },
            modify_schedule(schedule) {
                this.schedule_title = schedule.title;
                this.schedule_start = this.time_format(schedule.startTime);
                this.schedule_end = this.time_format(schedule.endTime);
                this.schedule_select_members = ['박찬준'];
                this.schedule_is_alram = schedule.alarm == 0 ? false : true;
                this.schedule_select_time = ['15분전'];
                this.scehdule_comment = schedule.comment;

                this.modify = true;
                this.modify_id = schedule.id;
                this.dialog = true;
            },
            schedule_dialog_clear() {
                this.schedule_title = '';
                this.schedule_start = null;
                this.schedule_end = null;
                this.schedule_select_members = [];
                this.schedule_is_alram = false;
                this.schedule_select_time = [];
                this.scehdule_comment = '';
            },
            time_format(time) {
                return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0')
            }
        },
        mounted() {
            this.$store.dispatch("load_calendar", this.year);
            // TODO : EventSource 주소 상수화 필요
            this.sse_source = new EventSource("http://localhost:10831/calendar/schedules/sse");
            this.sse_source.onmessage = (event) => { 
                console.log('Receive Event : ' + event);
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