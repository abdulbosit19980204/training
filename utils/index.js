import {get } from "mongoose"

export default {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },

    isEnded(userId, userDoneId, options) {
        if (userDoneId == userId) {

            return options.fn(this.isEnded = true)
        }
        return options.inverse(this.isEnded = false)
    },


}