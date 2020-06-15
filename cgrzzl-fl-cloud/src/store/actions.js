
import * as types from '@/store/mutation-types'
export default {
    [types.UPDATE_supName]({commit, state}, params){
        console.log('action==>', state)
        if (!state) {
            commit(types.UPDATE_supName, sessionStorage.getItem('supName'))
        }
    },

}

