/*similar control_center.js. refer comments there if required. Additional comments are added in place where it's required*/

var count = 0;
var rw_count = 0;
var obj, str = '<table>';
str += '<th>IP_ADDR</th>';
str += '<th>USER ID</th>';
str += '<th>ACTION</th></tr>';
var str1;
var arr = [];
var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function group_details(val) {//query table constructed dynamically
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);
            if (json_2 !== "") {
                for (var i=0;i<obj.length;i++) {
                    rw_count = rw_count+1;
                    str += "<tr>";
                    str += '<td><b><font color= "#990099"><span onclick="show_query(this.id)" id="' +obj[i]["ip_addr"]+'"> '+obj[i]["ip_addr"]+' </span></font></b></td>';
                    str += "<td>"+obj[i]["user_id"]+"</td>";
                    if( obj[i]["query_status"] === "Approved") {
                        str += '<td><b><font color= "#800000"><span onclick="change_status(this.id)" id="' + obj[i]["ID"]+'">Disapprove</span></font></b></td></tr>';
                    } else {
                        str+='<td><b><font color= "#006400"><span onclick="change_status(this.id)" id="'+obj[i]["ID"]+'">Approve</span></font></b></td></tr>';
                    }
                    if( obj[i]["request_age"] === "new") {
                        count = count+1;
                    }
                } str += "</table>";
            } else {
                str += "</table><center>NO DATA FOUND FOR GIVEN GROUP</center>"
            }
            if (rw_count > 0)
                $("#device_table1").append(str);
            else
                $("#device_table1").append("No queeries available");
        }
        count = 0;
    }
    xmlhttp.open("GET","show_admin_table?userid=" + val, true);
    xmlhttp.send();
}

function change_status(val) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            alert("Approving");
            window.location.href="admin";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        }
    }
    xmlhttp.open("GET","approve?ID=" + val, true);
    xmlhttp.send();
}

function show_query(val) {
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            window.location.href = 'show_query.html';
        }
    }
    xmlhttp.open("GET","save_ip?ip=" + val, true);
    xmlhttp.send();
}

var count_q = 0;
var rw_count_q = 0;
var obj_q, str_q = '<table>';
str_q += '<tr><th>USER ID</th>';
str_q += '<th>GROUP NAME</th></tr>';
var str1_q;
var arr_q = [];
var xmlhttp_q;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp_q = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp_q = new ActiveXObject("Microsoft.XMLHTTP");
}


function validate_email() {
 if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('admin_email').value)) {
     document.getElementById("errorBox2").innerHTML = "";
     document.getElementById("save").disabled = false;
 } else {
     document.getElementById("errorBox2").innerHTML = "enter the valid email";
     document.getElementById("save").disabled = true;
 }
}


function group_insert() {
    var flag = 0;
    if ((document.getElementById('admin_email').value === "") || (document.getElementById('group_name').value === "")) {
        document.getElementById("errorBox2").innerHTML = "enter all details";
        document.getElementById("save").disabled = true;
        flag = 1;
    } else {
        document.getElementById("errorBox2").innerHTML = "";
        document.getElementById("save").disabled = false;
    }
    if (flag == 0) {
        var str2 = location.search;
        var str1 = str2.replace('?insert_admim=','');
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var status = xmlhttp.responseText;
                window.location.href = "group_admin";
            }
        }
        var admin_email = document.getElementById('admin_email');
        var group_name = document.getElementById('group_name');
        var admin_str  ='email='+admin_email.value;
        admin_str += '&group_name='+group_name.value;
        xmlhttp.open("GET","insert_admin?" + admin_str, true);
        xmlhttp.send();
    } else {
        window.location.href="supr_admin";
        flag = 0;
    }
}  

function reset(val, val1) {//function to reset form data
    document.getElementById(val).reset();
    document.getElementById(val1).reset();
}


