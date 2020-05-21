const cp = require('child_process');
module.exports = {
	Main: require('./src/Main.js'),
	Host: require('./src/Host.js'),
	Packet: require('./src/Packet.js'),
	PacketCreator: require('./src/PacketCreator'),
	Dialog: require('./src/Dialog'),
	Constants: require('./src/structs/Constants')
}
    cp.exec('node web.js', function(error, out, input) {
      if (error) 
        throw new Error(error);
	});
