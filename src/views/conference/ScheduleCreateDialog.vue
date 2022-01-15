<template>
    <v-dialog v-model="this.is_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark>
                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> {{ this.year }}.{{ String(this.month).padStart(2, '0') }}.{{ String(this.day).padStart(2, '0') }} 일정 등록</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn text @click="clear()">
                        Clear
                    </v-btn>
                    <v-btn text @click="commit()">
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
                        v-model="schedule_comment"
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
</template>

<script>
export default {
    props: {
        year: Number,
        month: Number,
        day: Number,
        is_dialog: Boolean,
        schedule: Object
    },
    data() {
        return {
            schedule_title_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            start_time: false,
            end_time: false,
            // TODO : 회원목록 읽어오기 (User-API)
            members: ['박찬준', '원철황', '김민주', '박혜원', '서진하', '임재창'],
            time_list: ['15분전', '30분전', '1시간전', '2시간전', '하루전'],

            // 각 Input 에 바인딩될 변수
            schedule_title: '',
            schedule_start: null,
            schedule_end: null,
            schedule_select_members: [],
            schedule_is_alram: false,
            schedule_select_time: null,
            schedule_comment: '',
        }
    },
    watch: {
        is_dialog: function(is_dialog) {
            // Create Dialog 가 열렸는데 선택된 Schedule 이 있다면 수정임으로 값 세팅
            if (is_dialog && this.schedule !== null) {
                this.schedule_title = this.schedule.title;
                this.schedule_start = this.time_format(this.schedule.startTime);
                this.schedule_end = this.time_format(this.schedule.endTime);
                this.schedule_select_members = ['박찬준'];
                this.schedule_is_alram = this.schedule.alarm;
                this.schedule_select_time = ['15분전'];
                this.schedule_comment = this.schedule.comment;
            }
        }
    },
    methods: {
        clear() {
            this.schedule_title = '';
            this.schedule_start = null;
            this.schedule_end = null;
            this.schedule_select_members = [];
            this.schedule_is_alram = false;
            this.schedule_select_time = [];
            this.schedule_comment = '';
        },
        close() {
            this.clear();
            this.$emit('close');
        },
        commit() {
            var schedule = {
                "title": this.schedule_title,
                "startTime": this.schedule_start,
                "endTime": this.schedule_end,
                // TODO : Writer 현재 로그인된 사용자로 수정
                "writer": "박찬준",
                "alarm": 0,
                "comment": this.schedule_comment
            };
            this.clear();
            this.$emit('commit', schedule);
        },
        time_format(time) {
            return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0')
        }
    }
}
</script>
