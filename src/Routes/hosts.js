const router = require('express').Router();
const { getPing } = require('../Connection/ping')

router.get('/:hostaddress', async (req, res) => {
    const host = req.params.hostaddress
    console.log(req)
    try {
        const ping = await getPing(host)
        console.log(ping)
        if (ping.host == "unknown") {
           return res.status(400).send({ status: 400, error: 'Bad Request', msg: 'Host introuvable ou inconnu'})
        }
        res.status(200).json(ping);
    } catch (error) {
        return res.status(500).send({ status: 500, error: 'Unknown Error', msg: `Une erreur c\'est produite: ${error}`})
    }
})


module.exports = router;