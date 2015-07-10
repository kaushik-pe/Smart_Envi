/*similar control_center.js. refer comments there if required. Additional comments are added in place where it's required*/
var rw_count1 = 0;
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

//query table constructed dynamically 
function notify(val) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);
            if (json_2 !== "") {
                for (var i=0;i<obj.length;i++) {
                    if( obj[i]["query_status"] === "Not Approved" && obj[i]["request_age"] === "new") {
                        rw_count1 = rw_count1+1;
                        str += "<tr>";
                        str += '<td><b><font color= "#990099"> '+obj[i]["ip_addr"]+' </font></b></td>';
                        str += "<td>"+obj[i]["user_id"]+"</td>";
                        str += '<td><b><font color= "#006400"><span onclick="change_status(this.id)" id="'+obj[i]["ID"]+'">Approve</span></font></b></td></tr>';
                    }
                }   str += "</table>"
            } else {
                str = "<center>NO DATA FOUND FOR GIVEN GROUP</center>"
            }
            if (rw_count1 > 0)
                $("#dev_table").append(str);
            else
                $("#dev_table").append("<font color= '#006400' size= '40px'><center>No new requests</center></font>");
        }
    }
    xmlhttp.open("GET","show_admin_table_new?userid="+val,true);
    xmlhttp.send();
}

//changing approval and disapproval status of the device
function change_status(val) {
    xmlhttp.onreadystatechange=function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            window.location.href="admin";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        }
    }
    xmlhttp.open("GET","approve?ID="+val,true);
    xmlhttp.send();
}

