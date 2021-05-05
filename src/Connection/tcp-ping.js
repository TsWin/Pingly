const tcpp = require('tcp-ping');

async function getTcpPing(host, port, callback) {
    tcpp.ping({ address: host, port, timeout: 500 }, callback);
}

module.exports = { getTcpPing };