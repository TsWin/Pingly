const router = require('express').Router();
const { getPing } = require('../Connection/ping')
const { getGotInfo } = require('../Connection/got')

router.get('/:hostaddress', async (req, res) => {
    const host = req.params.hostaddress
    try {
        const ping = await getPing(host)
        const gotInfo = await getGotInfo(host)
        res.status(200).json({ pingInfo: ping, statusInfo: gotInfo });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 500, error: 'Unknown Error', msg: `Une erreur c\'est produite: ${error}`})
    }
})


module.exports = router;