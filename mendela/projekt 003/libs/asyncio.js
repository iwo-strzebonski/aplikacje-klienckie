'use strict'

const timer = {
    time_diff: async( start ) => { return Date.now() - start },
    sleep: async(time) => {
        await new Promise(r => setTimeout(r, time))
    },
    get_time: async(time) => {
        await timer.sleep(0.1)
        return new Date(time).toISOString().slice(11,23)
    },
}