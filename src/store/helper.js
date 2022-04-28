import { mapGetters } from 'vuex'

export const authComputed = {
    ...mapGetters(['loggedIn']),
    ...mapGetters(['loginInfo']),
    ...mapGetters(['userInfo'])
}