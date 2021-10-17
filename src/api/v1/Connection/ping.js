const ping = require('ping')

async function getPing(host) {
    let response = await ping.promise.probe(host);
    if (response.host == "unknown") {
        return { status: 400, error: 'Bad Request', msg: 'Host introuvable ou inconnu'}
     }
    return response
}

module.exports = { getPing };