import store from "@/store/index.js";
import { alertPopup } from "@/mixins/alertPopup.js";
export default function (to, from, next) {
  // 로그인 유저가 없을때는 로그인 팝업창을 띄운다
  // 단 유저가, 회원가입 또는 메인으로 갈 경우는 허용한다.
  if (store.state.isLogin === false) {
    if (to.path === "/" || to.path === "/register" || to.path === "/login") {
      next();
    } else {
      store.commit("alertPopup", {
        isPopupShow: true,
        alertMsg:
          "로그인이 필요한 화면입니다.\u00A0 \u00A0 \u00A0 로그인하시겠습니까?",
      });
    }
  } else {
    next();
  }
}
