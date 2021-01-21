const ping = require('ping')

async function getPing(host) {
    let response = await ping.promise.probe(host);
    return response
}

module.exports = { getPing };