/*similar control_center.js. refer comments there if required. Additional comments are added in place where it's required*/
var obj, str = '<table>';
str += '<tr><th>Sel</th>';
str += '<th>IP ADDRESS</th>';
str += '<th>COMMAND</th>';
str += '<th>PARAMETER 1</th>';
str += '<th>PARAMETER 2</th>';
str += '<th>EMAIL NOTIFICATIONS</th>';
str += '<th>QUERY TYPE</th>';
str += '<th>QUERY STATUS</th></tr>';
var str1;
var arr = [];
var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

//query table constructed dynamically
function disp_tab() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);
            if (json_2 !== "") {
                for (var i=0; i<obj.length; i++) {
                    if (obj[i]["query_status"] === "Approved") {
                    str += "<tr>";
                    str += "<td><input type='checkbox' onchange='chck(this.id)' id='"+obj[i]["ID"]+"'></td>";
                    str += '<td><font color= "#1b5e20"> '+obj[i]["ip_addr"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["type_cmd"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["param_1"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["param_2"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["email_notifications"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["query_type"]+'</font></td>';
                    str += '<td><font color= "#1b5e20"> '+obj[i]["query_status"]+'</font></td></tr>';
                    } else {
                               str += "<tr>";
                    str += "<td><input type='checkbox' onchange='chck(this.id)' id='"+obj[i]["ID"]+"'></td>";
                    str += '<td><font color= "#b71c1c"> '+obj[i]["ip_addr"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["type_cmd"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["param_1"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["param_2"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["email_notifications"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["query_type"]+'</font></td>';
                    str += '<td><font color= "#b71c1c"> '+obj[i]["query_status"]+'</font></td></tr>';
                    }
                        
                }
                str += "</table>";
            } else {
                str += "</table><center>NO DATA FOUND FOR GIVEN DEVICE</center>";
            }
            $("#device_table").append(str);
        }
    }
    xmlhttp.open("GET","show_query",true);//ip address obtained is appended along with the url which can be processed in the server
    xmlhttp.send();
}

//funtion redirecting to add query for the device
function redir_ins_query() {
    window.location.href="add_query";
}

function chck(val) {
    var check_bool=document.getElementById(val).checked;
    if(check_bool==true) {
        arr.push(val);
    } else {
        var index = arr.indexOf(val);
        arr.splice(index,1); 
    }
}

  
//function redirecting to delete query for the device
function del_query() {
   if(  arr.length > 0) {
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location.href="show_query.html?ip="+str1;//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        } 
        }
     xmlhttp.open("GET","del_query?ID="+arr,true);
    xmlhttp.send();
   } else {
        alert("No item selected to be deleted");
    }
}

//function redirecting to edit query for the device
function edit_query() {
      if(  arr.length == 1) {
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location.href="add_query";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        }
    }
    xmlhttp.open("GET","del_query?ID="+arr,true);
    xmlhttp.send();
} else if(  arr.length > 1) {
           alert("Only one item can be selected to be edited");
    } else {
         alert("No item selected to be edited");
    }
}