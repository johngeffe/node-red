module.exports = function(RED) {
  var os = require('os');

  function NodejsIpNode(config) {
    RED.nodes.createNode(this, config);

    this.on('input', function(msg) {
        var node = this;
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
          var alias = 0;
          ifaces[dev].forEach(function(details) {
            if (details.family == 'IPv4') {
              if (details.address != '127.0.0.1') {
                msg.payload = (dev + (alias ? ':' + alias : ''), details.address);
                ++alias;
                node.send(msg);
              }
            }
          });
        }
      });
    }
    RED.nodes.registerType("nodejs-ip", NodejsIpNode);
  }
  
