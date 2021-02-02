const nodemailer = require('nodemailer')
const {user, pass} = require('../config.json')

const sendEmail = (text, emails) => {
    const transporter = nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {
            user,
            pass,
        }
    })
    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear()
    const date = year + '-' + month + '-' + day

    emails.forEach((email) => {
        transporter.sendMail({
            to: email,
            from: 'assignments@notification.com',
            subject: `Adelaide's assignments and due dates for: ${date}`,
            text
        })
    })
}

const notify = (res, emails) => {
    let text = ''
    Object.keys(res).forEach(key => {
        if (res[key].length > 0) {
            text += `Assignments for ${key}:\n`
            res[key].forEach(assignment => {
                text += `Assignment "${assignment.title}" is due on ${assignment.due}\n`
            })
            text += '\n'
        }
    })
    sendEmail(text, emails)
}

module.exports = notify