//js file to add device to a particula r group by the super admin

//function to reset the value
function reset(val) {
    document.getElementById(val).reset();
}

//function to insert that the device belongs to the group by the super admin
function dev_insert(x) {
        var flag = 0;  
    //checking whether all details are specified
        if ((document.getElementById('ip_addr').value === "") || (document.getElementById('group_no').value === "")) {
            document.getElementById("errorBox").innerHTML = "enter all details";
            document.getElementById("save").disabled = true;
            flag = 1;
        } else {
            document.getElementById("errorBox").innerHTML = "";
            document.getElementById("save").disabled = false;
        } if(flag === 0) { // if all details are availabe device is added
            var xmlhttp;
            try{
                // Opera 8.0+, Firefox, Safari
                xmlhttp = new XMLHttpRequest();
            } catch (e){
                // Internet Explorer Browsers
                try{
                    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try{
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e){
                        // Something went wrong
                        alert("Your browser broke!");
                    }
                }
            } xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    var status = xmlhttp.responseText;
                    window.location.href = "disp_dev_group";
                }
            }
            /* form data obtained and a query string is created which is to be appended to the url*/
            var ip_addr = document.getElementById('ip_addr');
            var group_no = document.getElementById('group_no');
            var query_str = 'ip_addr='+ip_addr.value;
            query_str += '&group_no='+group_no.value;
            xmlhttp.open("GET","ins_dev_group?"+query_str,true);
            xmlhttp.send();
        } else { //some details are missing
            window.location.href = "supr_admin";
            flag = 0;
        }
}
 /*function to validate IP address mentioned by super admin*/
function validate_ip() {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test( document.getElementById('ip_addr').value)) {
        document.getElementById("errorBox").innerHTML = "";
        document.getElementById("form_submit").disabled = false;
    } else {
        document.getElementById("errorBox").innerHTML = "Enter a valid IP Address (e.g. 172.16.254.1 ).";
        document.getElementById("form_submit").disabled = true;
    }
}



