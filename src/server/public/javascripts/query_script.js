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
function rule_insert(x) {
 xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            window.location.href = "show_query.html";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        }
    };
    var type_cmd = document.getElementById('type_cmd');
    var param_1 = document.getElementById('param_1');
    var param_2 = document.getElementById('param_2');
    var email_notifications = document.getElementById('email_notifications');
    var query_str ='&type_cmd=' + type_cmd.value;
    query_str += '&param_1=' + param_1.value;
    query_str += '&param_2=' + param_2.value;
    query_str += '&email_notifications=' + email_notifications.value;
    query_str += '&user_id=' + x;
    xmlhttp.open("GET", "insert_query?" + query_str, true);
    xmlhttp.send();
}
function reset() {//function to reset form data
    document.getElementById("param_2").value= "";
}
function validate_time() {
    if (/^(0[0-9]|1[0-9]|2[0-3])(\:)(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/.test(document.getElementById('param_2').value)) {
        document.getElementById("errorBox").innerHTML = "";
        document.getElementById("form_submit1").disabled = false;
    } else {
        document.getElementById("errorBox").innerHTML = "enter the valid time (e.g. 17:47).";
        document.getElementById("form_submit1").disabled = true;
    }
}
