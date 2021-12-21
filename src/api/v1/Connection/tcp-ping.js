const tcpp = require('tcp-ping');
const util = require('util');
const tcpPing = util.promisify(tcpp.ping);

async function getTcpPing(host, port) {
    let response = await tcpPing({ address: host, port, timeout: 500 });
    return response;
}

module.exports = { getTcpPing };