import { mapGetters, mapMutations } from "vuex";
export const alertPopup = {
  data: () => ({}),
  computed: {
    ...mapGetters(["isPop", "getMsg"]),
  },
  methods: {
    ...mapMutations(["alertPopup"]),
    alarm(message) {
      this.alertPopup({ isPopup: true, message });
    },
  },
};
