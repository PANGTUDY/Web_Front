import store from '../store/index.js'
export default function (to, from, next) {
    console.log('to', to);
    console.log('from', from);
    if (to.path !== '/login') {
        if (to.path === '/' ) {
            next();
            
        } else {
            if (store.state.isLogin === false) {
                if (to.path === '/register') { next(); }
                else {
                    store.state.popupSetting = true;
                    next('/login');
                }
            } else {
                next();
            }
        }
    } else {
        next();
    }
   
};