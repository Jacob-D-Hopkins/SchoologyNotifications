const schoologyClient = require('./src/getClient')
const fetchAssignments = require('./src/fetchAssignments')
const notify = require('./src/notify')

const {courses, courseNames, emails} = require('./config.json')

fetchAssignments(schoologyClient, courses, courseNames).then((res) => {
    notify(res, emails)
})