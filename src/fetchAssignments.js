const fetchData = async (schoologyClient, course) => {
    const resTotal = await schoologyClient.get(`sections/${course}/assignments?start=0&limit=1`)
    const total = resTotal.data.total

    const resAssignments = await schoologyClient.get(`sections/${course}/assignments?start=${total-20}`)
    const assignments = resAssignments.data.assignment

    const result = assignments.filter(assignment => {
        const timeDue = Date.parse(assignment.due)/1000
        const now = Date.now()/1000
        const timeDif = timeDue - now
        
        return (assignment.due && (timeDif < 432000 && timeDif > 0))
    })
    return result.slice(0,5)
}

const fetchAssignments = async (schoologyClient, courses, courseNames) => {
    let result = {}

    // This is bad but I don't know what else to use
    for await (course of courses) {
        const assignments = await fetchData(schoologyClient, course)
        const i = courses.indexOf(course)
        result[courseNames[i]] = []
            
        for await (assignment of assignments) {
            const submission = await schoologyClient.get(`sections/${course}/submissions/${assignment.grade_item_id}`)

            if (submission.data.revision.length == 0) {
                result[courseNames[i]].push({
                    courseID: course,
                    courseName: courseNames[i],
                    title: assignment.title,
                    due: assignment.due
                })
            }
        }
    }

    return result
}

module.exports = fetchAssignments