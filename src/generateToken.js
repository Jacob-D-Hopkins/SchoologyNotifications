const crypto = require('crypto')

const {consumerKey, consumerSecret} = require('../config')

const genToken = () => {
    // Get header params
    const nonce = crypto.randomBytes(16).toString('hex')
    const time = Math.round(Date.now()/1000);

    // Create the authentication header
    let auth = 'OAuth realm="Schoology API",'
    auth += 'oauth_consumer_key="' + consumerKey + '",'
    auth += 'oauth_token="",'
    auth += 'oauth_nonce="' + nonce + '",'
    auth += 'oauth_timestamp="' + time + '",'
    auth += 'oauth_signature_method="PLAINTEXT",'
    auth += 'oauth_version="1.0",'
    auth += 'oauth_signature="' + consumerSecret + '%26"'
    return auth
}

module.exports = genToken