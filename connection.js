const {connect} = require('mongoose')
const debug = require('debug')('dev:mongoose')
 
async function connectDB(url) {
    connect(url).then(() => {
        debug("Connected to Database");
    }).catch((err) => {
        debug("Failed to connect to Database")
    })
}

module.exports = {connectDB}
