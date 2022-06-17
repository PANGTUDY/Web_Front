import { mapGetters, mapMutations, mapState } from "vuex";
import { ALERT_POP_UP, CLOSE_POPUP, SET_VALUE } from "../store";
export const alertPopup = {
  data: () => ({}),
  computed: {
    ...mapState({
      isPopupShow: ({ isPopupShow }) => isPopupShow,
      alertMsg: ({ alertMsg }) => alertMsg,
    }),
  },
  methods: {
    ...mapMutations({
      alertAlarm: ALERT_POP_UP,
      close: CLOSE_POPUP,
      setValue: SET_VALUE,
    }),

    alarm(alertMsg) {
      console.log("타니");
      this.alertAlarm({ isPopupShow: true, alertMsg: alertMsg });
    },
  },
};
