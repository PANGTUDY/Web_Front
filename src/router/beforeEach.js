import store from '../store/index.js';
export default function (to, from, next) {
  // 로그인 유저가 없을때는 로그인 팝업창을 띄운다
  // 단 유저가, 회원가입 또는 메인으로 갈 경우는 허용한다.
  if (store.state.isLogin === false) {
    if (to.path === '/' || to.path === '/register' || to.path === '/login') {
      next();
    } else {
      store.state.popupSetting = true;
    }
  } else {
    next();
  }
}
