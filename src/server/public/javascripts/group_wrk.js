/*similar control_center.js. refer comments there if required. Additional comments are added in place where it's required*/

//toggle between show less and more
function toggletext(cid, vid, vlid) {
    if ((document.getElementById(cid).style.display === "none") && (document.getElementById(vlid).style.display === "none")) {
        document.getElementById(cid).style.display = "block";
        document.getElementById(vid).style.display = "none";
        document.getElementById(vlid).style.display = "block";
    } else if ((document.getElementById(cid).style.display === "block") && (document.getElementById(vlid).style.display === "block")) {
        document.getElementById(cid).style.display = "none";
        document.getElementById(vid).style.display = "block";
        document.getElementById(vlid).style.display = "none";
    } else {
        document.getElementById(cid).style.display = "none";
    }
}

var count = 0;
var rw_count = 0;
var obj, str = '<table>';
str += '<th>DEVICE NAME</th>';
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

//function to notify the new request of devices to the admin
function group_details(val) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);
            if (json_2 !== "") {
                for (var i=0;i<obj.length;i++) {
                    rw_count=rw_count+1;
                    str+="<tr>";
                      str+="<td>"+obj[i]["name"]+"</td>";
                    str+='<td><b><font color= "#990099"><span onclick="show_query(this.id)" id="'+obj[i]["ip_addr"]+'"> '+obj[i]["ip_addr"]+' </span></font></b></td>';
                    str+="<td>"+obj[i]["user_id"]+"</td>";
                    if( obj[i]["query_status"] === "Approved") {
                        str+='<td><b><font color= "#800000"><span onclick="change_status(this.id)" id="'+obj[i]["ID"]+'">Disapprove</span></font></b></td></tr>';
                    } else {
                        str+='<td><b><font color= "#006400"><span onclick="change_status(this.id)" id="'+obj[i]["ID"]+'">Approve</span></font></b></td></tr>';
                    }
                    if( obj[i]["request_age"] === "new") {
                        count = count+1;
                    }
                }
                str+="</table>"
            } else {
                str+="</table><center>NO DATA FOUND FOR GIVEN GROUP</center>" 
            }
            if(rw_count > 0)
                $("#device_table1").append(str);
            else
                $("#device_table1").append("No queeries available");
            $("#count_text").append(count);
            if(count==0) {
                document.getElementById('view_que').style.display='none';
            } else {
                document.getElementById('no_view_que').style.display='none';
            }
        }
        count=0;
    }
    xmlhttp.open("GET","show_admin_table?userid="+val,true);
    xmlhttp.send();
}

//function to change approval/disapproval status of the device
function change_status(val) {
    xmlhttp.onreadystatechange=function () {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location.href="admin";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
        }
    }
    xmlhttp.open("GET","approve?ID="+val,true);
    xmlhttp.send();
 }

//function to view query on click of the ip address
function show_query(val) {
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location.href='show_query.html';
        }
    }
    xmlhttp.open("GET","save_ip?ip="+val, true);
    xmlhttp.send();
}

var count_q = 0;
var rw_count_q = 0;
var obj_q,str_q = '<table>';
str_q += '<th>IP_ADDR</th>';
str_q += '<th>USER ID</th>';
str_q += '<th>ACTION</th></tr>';
var str1_q;
var arr_q = [];
var xmlhttp_q;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp_q = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp_q=new ActiveXObject("Microsoft.XMLHTTP");
}

//function to notify the changes in default query to the admin
function group_query(val)//query table constructed dynamically
{
 
   xmlhttp_q.onreadystatechange=function()
            {
              if (xmlhttp_q.readyState==4 && xmlhttp_q.status==200)
                {
                  var resp_q=xmlhttp_q.responseText;;
                  json_2_q = xmlhttp_q.responseText;
                  obj_q=JSON.parse(json_2_q);
                   
                  if(json_2_q!="")
                  {
                    for (var i=0;i<obj_q.length;i++)
                        {
                        if( obj_q[i]["query_status"] === "Not Approved" && obj_q[i]["query_type"] === "Default" ) {
                                  
                            rw_count_q=rw_count_q+1;
                            count_q = count_q+1;
                        str_q += "<tr>";
                        str_q += '<td>"'+obj_q[i]["ip_addr"]+'"</td>';    
                        str_q += "<td>"+obj_q[i]["user_id"]+"</td>";
                        str_q += '<td><b><font color= "#006400"><span onclick="change_status_q(this.id)" id="'+obj_q[i]["ID"]+'">Approve</span></font></b></td></tr>'; 
                        }   
                  }   str_q += "</table>"
                  }
                    else
                    {
                     str_q += "</table><center>NO DATA FOUND FOR GIVEN GROUP</center>"   
                        
                    }
                    
                    
                    if(rw_count_q > 0)
                    $("#device_table_q").append(str_q);
                    else
                        $("#device_table_q").append("No queeries available");
               
                    $("#count_text_q").append(count_q);
                    if (count_q === 0)
                    {
                        document.getElementById('view_que_q').style.display='none';   
                    }
                    else{
                        document.getElementById('no_view_que_q').style.display='none';   
                    }
                }
       count_q=0;
            }
     xmlhttp_q.open("GET","show_admin_groupnotify?userid="+val, true);
            xmlhttp_q.send();
}

//changing approval and disapproval status of the devices from the admin page
function change_status_q(val)
{
xmlhttp_q.onreadystatechange = function()
            {
              if (xmlhttp_q.readyState === 4 && xmlhttp_q.status === 200)
                {
                    window.location.href = "admin";//redirecting to query list,ip is appended along with the url to select appropriate rows from the database
                }
        
        }
     xmlhttp_q.open("GET","approve_q?ID="+val, true);
     xmlhttp_q.send();
}

function search()
{
    var search_key = document.getElementById('search_box').value;
    if(search_key=="")
    {
        show_table("hello!!!");   
        
    }
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test( document.getElementById('search_box').value))
  {
    document.getElementById("errorBox").innerHTML = "";
    var  str1 = '<table>';
    str1 += '<th>Device Name</th>';
    str1 += '<th>IP Address</th>';
    str1 += '<th>User ID</th>';
    str1 += '<th>Action</th></tr>';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //json string obtained from the db by using select statement
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);//json string parsed to object
            for (var i = 0; i<obj.length; i++) {
                str1 += "<tr>";
                str1 += "<td>"+obj[i]["name"]+"</td>";
                str1 += "<td>"+obj[i]["ip_addr"]+"</td>";
                str1 += "<td>"+obj[i]["user_id"]+"</td>";
                str1 += '<td><span onclick="del_device(this.id)" id="'+obj[i]["ip_addr"]+'">Delete</span></td></tr>';
                //function that lists rules set for each device is created dynamically here
            }
            str1 += "</table>";
            $("#device_table1").html(str1);
            str1="";
        }
    }
    xmlhttp.open("GET","search_device?ip_addr="+search_key,true);
    xmlhttp.send();  
      
  }
    else
    {
        document.getElementById("errorBox").innerHTML = "Enter a valip IP address";
        
    }

}



