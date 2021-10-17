const router = require('express').Router();
const { getPing } = require('../Connection/ping')
const { getTcpPing } = require('../Connection/tcp-ping')

router.get('/:hostaddress?', async (req, res) => {
    const host = req.params.hostaddress
    const port = req.query.port
    const timeoutValue = req.query.timeout
    let tcpPing;
    let options;

    try {
        function portPing(err, response) {
            if (isNaN(response.avg)) {
                tcpPing = { status: 400, error: 'Bad Request', msg: 'Host introuvable ou inconnu' }
                return tcpPing
            }
            tcpPing = response;
            return tcpPing
        }

        if (port) {
            if (isNaN(port)) return res.status(400).send({ status: 400, error: 'Bad Request', msg: `Le port n'est pas un nombre`})
            tcpPing = await getTcpPing(host, port, portPing)
        }
        if (timeoutValue) {
            if (isNaN(timeoutValue)) return res.status(400).send({ status: 400, error: 'Bad Request', msg: `Le temps du timeout n'est pas un nombre` })
            options = { timeout: timeoutValue }
        } else {
            options = { timeout: 30000 }
        }


        const ping = await getPing(host)
        res.status(200).json({ pingInfo: ping, portPing: tcpPing });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 500, error: 'Unknown Error', msg: `Une erreur c\'est produite: ${error}`})
    }
})


module.exports = router;