function reset() {
    document.getElementById('nme').value="";
    document.getElementById('mac_addr').value="";
    document.getElementById('ip_addr').value="";
    document.getElementById('power_id').value="";
    document.getElementById("errorBox").innerHTML = "";
    document.getElementById("form_submit").disabled = false;
}

function dev_insert(x) {
    GetTextValue();
    var xmlhttp;
    try {
		// Opera 8.0+, Firefox, Safari
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer Browsers
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
				// Something went wrong
                alert("Your browser broke!");
            }
        }
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var status = xmlhttp.responseText;
            alert(status);
            if (status === "sucess") {
                window.location.href = "app_index";
            } else {
                alert("device already!!");
            }
        } 
    }
    /* form data obtained and a query string is created which is to be appended to the url*/
    var nme = document.getElementById('nme');
    var mac_addr = document.getElementById('mac_addr');
    var ip_addr = document.getElementById('ip_addr');
    var power_id = document.getElementById('power_id');
    var dev_type = document.getElementById('dev_type');
    var strarr="";
    var i=0;
    for(i=0;i<val_arr.length;i++)
    {
        strarr+= val_arr[i]+",";  
    }
    var query_str = 'name=' + nme.value;
    query_str += '&mac_addr=' + mac_addr.value;
    query_str += '&ip_addr=' + ip_addr.value;
    query_str += '&power_id=' + power_id.value;
    query_str += '&dev_type=' + dev_type.value;
    query_str += '&user_id=' + x;
    query_str += '&dep_id=' + strarr;
    strarr = "";
    xmlhttp.open("GET", "insert_dev?" + query_str, true);
    xmlhttp.send();
} 


//funtion to validate the ip address entered
function validate_ip() {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(document.getElementById('ip_addr').value)) {
        document.getElementById("errorBox").innerHTML = "";
        document.getElementById("form_submit").disabled = false;
    } else {
        document.getElementById("errorBox").innerHTML = "enter the valid IP Address (e.g. 172.16.254.1 ).";
        document.getElementById("form_submit").disabled = true;
    }
}

//funtion to validate the mac address
function validate_mac() {
    if (/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(document.getElementById('mac_addr').value)) {
        document.getElementById("errorBox").innerHTML = "";
        document.getElementById("form_submit").disabled = false;
    } else {
        document.getElementById("errorBox").innerHTML = "enter the valid Mac Address (e.g. 01-23-45-67-89-ab   or   01:23:45:67:89:ab ).";
        document.getElementById("form_submit").disabled = true;
    }
}

   $(document).ready(function() {
        var iCnt = 0;
        // CREATE A "DIV" ELEMENT AND DESIGN IT USING JQUERY ".css()" CLASS.
       // var container = $(document.createElement('div'))
        $('#btAdd').click(function() {
            if (iCnt < 10) {
                iCnt = iCnt + 1;
                 $('#dependencies').append("<label>Dependency " + iCnt + "</label>");
                // ADD TEXTBOX.
                $('#dependencies').append('<input type=text class="input" id=tb' + iCnt + ' ' + 'placeholder="Socket ID  ' + iCnt + '" onblur = "validate_ip()" /><br><br>');
              //  $('#dependencies').after(container);
              //  $('#add_dev_form').after(dependencies); // ADD BOTH THE DIV ELEMENTS TO THE "main" CONTAINER.
                
            }
            else {      // AFTER REACHING THE SPECIFIED LIMIT, DISABLE THE "ADD" BUTTON. (20 IS THE LIMIT WE HAVE SET)
                $('#dependencies').append('<label>Reached the limit</label>'); 
                $('#btAdd').attr('class', 'bt-disable'); 
                $('#btAdd').attr('disabled', 'disabled');
            }
        });
   });

 var divValue, values = '', val_arr = [];
    function GetTextValue() {
        values = '';
        $('.input').each(function() {
            values = this.value;
            val_arr.push(values);
            
        });
    }


