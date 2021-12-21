const router = require('express').Router();
const { getPing } = require('../Connection/ping')
const { getGotInfo } = require('../Connection/got')
const { getTcpPing } = require('../Connection/tcp-ping');
const { SentryError } = require('../../../../SentryError');

router.get('/:hostaddress?', async (req, res) => {
    const host = req.params.hostaddress
    const port = req.query.port
    const timeoutValue = req.query.timeout
    let tcpPing;
    let options;

    try {
        if (port) {
            if (isNaN(port)) return res.status(400).send({ status: 400, error: 'Bad Request', msg: `Le port n'est pas un nombre`})
            const response = await getTcpPing(host, port);
            const erroredResults = [];
            response.results.forEach((result) => {
                if (result.err) erroredResults.push(result.err);
            });
            if (erroredResults.length > 5) {
                tcpPing = { status: 502, error: 'Bad Gateway', msg: erroredResults[0].message }
            } else {
                tcpPing = response;
            }
        }
        if (timeoutValue) {
            if (isNaN(timeoutValue)) return res.status(400).send({ status: 400, error: 'Bad Request', msg: `Le temps du timeout n'est pas un nombre` })
            options = { timeout: timeoutValue }
        } else {
            options = { timeout: 30000 }
        }


        const ping = await getPing(host)
        const gotInfo = await getGotInfo(host, options)
        res.status(200).json({ pingInfo: ping, statusInfo: gotInfo, portPing: tcpPing });
    } catch (error) {
        new SentryError(error);
        console.log(error)
        return res.status(500).send({ status: 500, error: 'Unknown Error', msg: `Une erreur c\'est produite: ${error}`})
    }
})


module.exports = router;