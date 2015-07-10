/*fiel to display the details of admins to various groups to the super admin*/
var rw_count1_a = 0;
var obj_a, str_a = '<table>';
str_a += '<tr><th>USER ID</th>';
str_a += '<th>GROUP NAME</th>';
str_a += '<th>Action</th></tr>';
var str1_a;
var arr_a = [];
var xmlhttp_a;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp_a  = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp_a = new ActiveXObject("Microsoft.XMLHTTP");
}

//query table constructed dynamically
function group_admin(val_a) {
    xmlhttp_a.onreadystatechange = function () {
        if (xmlhttp_a.readyState === 4 && xmlhttp_a.status  === 200) {
            var resp_a = xmlhttp_a.responseText;
            json_2_a = xmlhttp_a.responseText;
            obj_a = JSON.parse(json_2_a);
            if (json_2_a !== "") {
                for (var i=0; i<obj_a.length; i++) { 
                    str_a += "<tr>";
                    str_a += "<td>"+obj_a[i]["email"]+"</td>";
                    str_a += "<td>"+obj_a[i]["group_name"]+"</td>";
                      str_a += '<td><span onclick="del_admin(this.id)" id="'+obj_a[i]["email"]+'">Delete</span></td></tr>';
                    rw_count1_a = rw_count1_a + 1;
                }
                str_a += "</table>";
            } else {
                str_a = "<center>NO DATA FOUND FOR GIVEN GROUP</center>"
            } if(rw_count1_a > 0)
                $("#grp_admin_table").append(str_a);
            else
                $("#grp_admin_table").append("<font color= '#006400' size= '40px'><center>No groups</center></font>");
        }
    } 
    xmlhttp_a.open("GET","group_admin1?email="+val_a,true);
    xmlhttp_a.send();
}

//funtion to delete admin control to group by the super admin
function del_admin(val) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            window.location.href = 'group_admin';
        }
    }
    xmlhttp.open("GET","del_admin?ip="+val,true);
    xmlhttp.send();
}
