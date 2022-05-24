import store from '../store/index.js'
export default function (to, from, next) {
    if (to.path !== '/login') {
        if (to.path === '/' ) {
            next();
            
        } else {
            if (store.state.isLogin === false) {
                store.state.popupSetting = true;
                next('/login');
            } else {
                next();
            }
        }
    } else {
        next();
    }
   
};