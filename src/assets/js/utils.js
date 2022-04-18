import persistedstate from 'vuex-persistedstate';
import { encrypt,decrypt } from './crypto';
export const createPersistedstate = () =>
    persistedstate({
        storage: {
            getItem: key =>sessionStorage.getItem(key) ===null ? key : decrypt(sessionStorage.getItem(key)),
            setItem: (key,value) => sessionStorage.setItem(key,encrypt(value)),
            removeItem: key => sessionStorage.removeItem(key)
        }
    });