const { HTTPError, RequestError } = require('got');
const got = require('got')

async function getGotInfo(host) {
    try {
        let response = await got(`http://${host}`, { https: { rejectUnauthorized: false }, });
        return { sitewebAccessible: true, statusCode: response.statusCode, error: null, statusMessage: response.statusMessage,}
    } catch (error) {
        if (error instanceof HTTPError) {
            let statusCode = error.message.split(' ');
            return {sitewebAccessible: false, statusCode: statusCode[2], error: error.message,}
        }
        if (error instanceof RequestError) {
            return {status: 400, error: 'Bad Request', msg: "Host introuvable ou inconnu", sitewebAccessible: false, statusCode: "unknown",}
        }
    }
}

module.exports = { getGotInfo };