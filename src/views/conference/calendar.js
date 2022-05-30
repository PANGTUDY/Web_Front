import Modal from "@/components/Modal.vue";
import { mdiPencil, mdiDelete, mdiStickerText } from "@mdi/js";
import * as Api from "@/api/conference";
import Swal from "sweetalert2";
import CreateDialog from "./ScheduleCreateDialog.vue";
import DetailDialog from "./ScheduleDetailDialog.vue";
import Vue from "vue";

export default {
  components: {
    Modal,
    CreateDialog,
    DetailDialog,
  },
  data() {
    return {
      icons: {
        mdiPencil,
        mdiDelete,
        mdiStickerText,
      },

      // v-calendar 관련 변수
      focus_date: "",
      selected_schedule: {},
      selected_element: null,
      selected_open: false,
      schedules: [],

      // Create Dialog, Detail Dialog 표시될 정보
      current_schedule: null,
      create_dialog: false,
      detail_dialog: false,

      change: false,
      sse_source: null,

      // Create, Modify 구분용 변수
      is_modify: false,
      modify_id: 0,
    };
  },
  computed: {
    year() {
      return this.focus_date !== ""
        ? Number(this.focus_date.split("-")[0].replace(/^0+/, ""))
        : new Date().getFullYear();
    },
    month() {
      return this.focus_date !== ""
        ? Number(this.focus_date.split("-")[1].replace(/^0+/, ""))
        : new Date().getMonth() + 1;
    },
    day() {
      return this.focus_date !== ""
        ? Number(this.focus_date.split("-")[2].replace(/^0+/, ""))
        : new Date().getDate();
    },
    calendar() {
      const calendar = this.$store.getters.get_calendar;
      const schedules = [];
      for (const key in calendar) {
        calendar[key].forEach(schedule => {
          console.log(schedule);
          schedules.push({
            id: schedule.id,
            name: schedule.title,
            start: new Date(
              schedule.year,
              schedule.month - 1,
              schedule.day,
              schedule.startTime[0],
              schedule.startTime[1],
              0,
              0,
            ),
            end: new Date(
              schedule.year,
              schedule.month - 1,
              schedule.day,
              schedule.endTime[0],
              schedule.endTime[1],
              0,
              0,
            ),
            participants: schedule.participants,
            color: "pink",
            details: schedule.comment,
            timed: true,
          });
        });
      }
      this.schedules = schedules;
      return calendar;
    },
  },
  watch: {
    year: async function (year) {
      await Api.get_calendar(this.year).then(data => {
        this.$store.dispatch("load_calendar", {
          year: this.year,
          calendar: data.data,
        });
      });
    },
  },
  methods: {
    close_create_dialog() {
      this.create_dialog = false;
      this.current_schedule = null;
    },
    close_detail_dialog() {
      this.detail_dialog = false;
      this.current_schedule = null;
    },
    set_today() {
      this.focus_date = "";
    },
    set_date({ date }) {
      this.focus_date = date;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    show_schedule({ nativeEvent, event }) {
      const event_date =
        event.start.getFullYear() +
        "-" +
        (event.start.getMonth() + 1) +
        "-" +
        event.start.getDate();
      const open = () => {
        this.focus_date = event_date;
        this.selected_schedule = event;
        this.selected_element = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selected_open = true)),
        );
      };

      if (this.selected_open) {
        this.selected_open = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    detail_schedule(schedule) {
      this.detail_dialog = true;
      this.current_schedule = schedule;
    },
    create_schedule() {
      this.create_dialog = true;
    },
    modify_schedule(schedule) {
      this.current_schedule = schedule;
      this.modify = true;
      this.modify_id = schedule.id;

      this.detail_dialog = false;
      this.create_dialog = true;
    },
    commit_create_dialog(schedule) {
      console.log(schedule);
      Vue.set(schedule, "year", this.year);
      Vue.set(schedule, "month", this.month);
      Vue.set(schedule, "day", this.day);

      if (this.modify) {
        Vue.set(schedule, "id", this.modify_id);
        Api.modify_schedule(schedule).then(data => { });
      } else {
        Api.create_schedule(schedule).then(data => { });
      }

      this.modify = false;
      this.modify_id = 0;
      this.current_schedule = null;
      this.create_dialog = false;
    },
    delete_schedule(id) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then(function (result) {
        if (result.isConfirmed) {
          Api.delete_schedule(id).then(data => {
            Swal.fire({
              title: "Success!",
              text: "You succeeded in deleting the schedule.",
              icon: "success",
              confirmButtonClass: "btn btn-success btn-fill",
              confirmButtonText: "OK",
              buttonsStyling: false,
            });
          });
        }
      });
    },
    time_format(time) {
      return (
        String(time[0]).padStart(2, "0") +
        ":" +
        String(time[1]).padStart(2, "0")
      );
    },
    async mounted() {
      // TODO : EventSource 주소 상수화 필요
      this.sse_source = new EventSource("http://pangtudy.xyz:8000/conference/calendar/schedules/sse");
      this.sse_source.onmessage = (event) => {
        console.log(event);
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
      this.$store.dispatch("change_schedule_event", event_data);
    }
  };

  // 최초 캘린더(현재날짜기준) 정보 읽어오기
  await Api.get_calendar(this.year).then(data => {
    this.$store.dispatch("load_calendar", {
      year: this.year,
      calendar: data.data,
    });
  }),
  beforeDestroy() {
    this.sse_source.close();
    this.sse_source = null;
  },
}
};
