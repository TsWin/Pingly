const { HTTPError, RequestError } = require('got');
const got = require('got')

async function getGotInfo(host, options) {
    const timeoutValue = parseInt(options.timeout)
    try {
        let response = await got(`http://${host}`, { https: { rejectUnauthorized: false }, timeout: timeoutValue, retry: { limit: 0, }, });
        console.log(response)
        return { sitewebAccessible: true, statusCode: response.statusCode, error: null, statusMessage: response.statusMessage, }
    } catch (error) {
        if (error instanceof HTTPError) {
            let statusCode = error.message.split(' ');
            return { sitewebAccessible: false, statusCode: statusCode[2], error: error.message, }
        }
        if (error instanceof RequestError && error.message == `Timeout awaiting 'request' for ${timeoutValue}ms`) {
            return { status: 503, error: 'Gateway timeout', msg: `Requête interrompu, temps d'attente dépassé de ${timeoutValue}ms`, sitewebAccessible: false, statusCode: "unknown", }
        }
        if (error instanceof RequestError) {
            return { status: 400, error: 'Bad Request', msg: "Host introuvable ou inconnu", sitewebAccessible: false, statusCode: "unknown", }
        }
    }
}

module.exports = { getGotInfo };