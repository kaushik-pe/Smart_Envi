var WeMo = new require('wemo')
var wemoSwitch = new WeMo('192.168.1.211', 49153);
wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
    if (err) console.error(err);
    console.log(result); // 1 
    wemoSwitch.getBinaryState(function(err, result) {
        if (err) console.error(err);
        console.log(result); // 1 
    });
});