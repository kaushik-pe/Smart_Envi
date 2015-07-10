var WeMo = new require('wemo')
module.exports = {
control : function(ip_addr,cmd)
{
    console.log(ip_addr+" "+cmd);
    var ip = ip_addr.toString();
    var wemoSwitch = new WeMo(ip, 49153);
    if(cmd=="turn_on")
    {
       wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
    if (err) console.error(err);
    console.log(result); // 1 
    });
    }
    else
    {
         wemoSwitch.setBinaryState(0, function(err, result) { // switch on 
        if (err) console.error(err);
        console.log(result); // 1 
        });
    }
}
};