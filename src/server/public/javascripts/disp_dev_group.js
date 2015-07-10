//file used to display the devices in the respective group to the super admin

//device table dynamically constructed and saved in a string


var xmlhttp,obj;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

//table populating function called during onload
function show_table(val) {
    var str = '<table>';
    str += '<th>IP Address</th>';
    str += '<th>Group No</th>';
    str += '<th>Action</th></tr>';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //json string obtained from the db by using select statement
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);//json string parsed to object
            for (var i = 0; i<obj.length; i++) {
                str += "<tr>";
                str += "<td>"+obj[i]["ip_addr"]+"</td>";
                str += "<td>"+obj[i]["group_no"]+"</td>";
                str += '<td><span onclick="del_device(this.id)" id="'+obj[i]["ip_addr"]+'">Delete</span></td></tr>';
                //function that lists rules set for each device is created dynamically here
            }
            str += "</table>";
            $("#device_table").html(str);
        }
    }
    xmlhttp.open("GET","show_dev_group?userid="+val,true);
    xmlhttp.send();
}

//function to add device to group by super admin
function redir_dev_lis() {
    xmlhttp.open("GET","add_device",true);
    xmlhttp.send();
}

//funtion to delete devices added to group by the super admin
function del_device(val) {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            window.location.href = 'disp_dev_group';
        }
    }
    xmlhttp.open("GET","del_dev?ip="+val,true);
    xmlhttp.send();
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
    str1 += '<th>IP Address</th>';
    str1 += '<th>Group No</th>';
    str1 += '<th>Action</th></tr>';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //json string obtained from the db by using select statement
            json_2 = xmlhttp.responseText;
            obj = JSON.parse(json_2);//json string parsed to object
            for (var i = 0; i<obj.length; i++) {
                str1 += "<tr>";
                str1 += "<td>"+obj[i]["ip_addr"]+"</td>";
                str1 += "<td>"+obj[i]["group_no"]+"</td>";
                str1 += '<td><span onclick="del_device(this.id)" id="'+obj[i]["ip_addr"]+'">Delete</span></td></tr>';
                //function that lists rules set for each device is created dynamically here
            }
            str1 += "</table>";
            $("#device_table").html(str1);
            str1="";
        }
    }
    xmlhttp.open("GET","search_dev_group?ip_addr="+search_key,true);
    xmlhttp.send();  
      
  }
    else
    {
        document.getElementById("errorBox").innerHTML = "Enter a valip IP address";
        
    }

}