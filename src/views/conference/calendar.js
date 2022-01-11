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
            focus: '',
            selected_schedule: {},
            selected_element: null,
            selected_open: false,
            schedules: [],

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
            members: ['박찬준', '원철황', '김민주', '박혜원', '서진하', '임재창'],
            schedule_is_alram: false,
            time_list: ['15분전', '30분전', '1시간전', '2시간전', '하루전'],
            schedule_select_time: [],
            scehdule_comment: ''
        }
    },
    computed: {
        year() {
            return this.focus !== '' ? Number(this.focus.split('-')[0].replace(/^0+/,'')) : new Date().getFullYear();
        },
        month() {
            return this.focus !== '' ? Number(this.focus.split('-')[1].replace(/^0+/,'')) : new Date().getMonth() + 1;
        },
        day() {
            return this.focus !== '' ? Number(this.focus.split('-')[2].replace(/^0+/,'')) : new Date().getDate();
        },
        calendar() {
            return this.$store.state.calendar;
        }
    },
    methods: {
        get_event_color (event) {
            return event.color;
        },
        set_today () {
            this.focus = '';
        },
        prev () {
            this.$refs.calendar.prev();
        },
        next () {
            this.$refs.calendar.next();
        },
        show_schedule ({ nativeEvent, event }) {
            const open = () => {
                this.selected_schedule = event
                this.selected_element = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selected_open = true))
            }

            if (this.selected_open) {
                this.selected_open = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }
            nativeEvent.stopPropagation()
        },
        more_schedules({ date }) {
            this.focus = date;
        },
        add_schedule() {
            this.schedule_dialog_clear();
            this.modify = false;
            this.dialog = true;
        },
        schedule_dialog_save() {
            // TODO : writer, alarm 설정 필요
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
                });
            } else {
                Api.create_schedule(schedule).then(data => {
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
                        });
                }
            })
        },
        modify_schedule(schedule) {
            // TODO : select_members, select_time 동적으로 수정 필요
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
    async mounted() {
        this.$refs.calendar.checkChange();

        // TODO : EventSource 주소 상수화 필요
        this.sse_source = new EventSource("http://localhost:10831/calendar/schedules/sse");
        this.sse_source.onmessage = (event) => { 
            var event_data = JSON.parse(event.data);
            console.log(event_data);
            // DELETE 는 event_data.schedule 에 id 만 넘어오기 때문에 일단 이렇게 처리... 개선이 필요한 부분
            if (event_data.type === 'DELETE') {
                this.$store.dispatch("change_schedule_event", event_data);
            }
            if (event_data.schedule.year === this.year) {
                if (event_data.schedule.month === this.month && event_data.schedule.day === this.day) {
                    this.change = true;
                }
                this.$store.dispatch("change_schedule_event", event_data);
            }
        }

        // 최초 캘린더(현재날짜기준) 정보 읽어오기
        await Api.get_calendar(this.year).then(data => {
            this.$store.dispatch("load_calendar", { year: this.year, calendar: data.data });

            const schedules = [];
            for (const key in this.$store.state.calendar) {
                this.$store.state.calendar[key].forEach(schedule => {
                    schedules.push({
                        id: schedule.id,
                        name: schedule.title,
                        start: new Date(schedule.year, schedule.month - 1, schedule.day, schedule.startTime[0], schedule.startTime[1], 0, 0),
                        end: new Date(schedule.year, schedule.month - 1, schedule.day, schedule.endTime[0], schedule.endTime[1], 0, 0),
                        color: 'blue',
                        details: schedule.comment,
                        timed: false,
                    });
                });
            }
            this.schedules = schedules;
        });
        
        // Vuex Action 호출시 트리거되는 콜백메소드 설정
        this.$store.subscribeAction((action, state) => {
            if (action.type === 'change_schedule_event') {
                const schedule = action.payload.schedule;
                switch (action.payload.type) {
                    case 'CREATE':
                        this.schedules.push({
                            id: schedule.id,
                            name: schedule.title,
                            start: new Date(schedule.year, schedule.month - 1, schedule.day, schedule.startTime[0], schedule.startTime[1], 0, 0),
                            end: new Date(schedule.year, schedule.month - 1, schedule.day, schedule.endTime[0], schedule.endTime[1], 0, 0),
                            color: 'blue',
                            details: schedule.comment,
                            timed: false,
                        });
                        break;
                    case 'MODIFY':
                        
                        break;
                    case 'DELETE':
                        const delete_index = this.schedules.findIndex(_schedule => _schedule.id === schedule.id);
                        this.schedules.splice(delete_index, 1);
                        break;
                }
            }
        });
    },
    beforeDestroy() {
        this.sse_source.close();
        this.sse_source = null;
    }
}