             
//device table dynamically constructed and saved in a string

var obj,str='<table border ="1">';                                  
str += '<tr><th>Name</th>';
//str += '<th>MAC Address</th>';
str += '<th>IP Address</th>';
str += '<th>Power Socket ID</th>';
str += '<th>Device Type</th>';
//str += '<th>User ID</th>';
str += '<th>Query</th>';
str += '<th>Device Status</th>';
str += '<th>Approval Status</th>';
str += '<th>Control</th></tr>';

var xmlhttp;
            if (window.XMLHttpRequest)
              { // code for IE7+, Firefox, Chrome, Opera, Safari
            
                  xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
function show_table(val)   //table populating function called during onload
    {
      
            xmlhttp.onreadystatechange=function()
            {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                  //json string obtained from the db by using select statement    
                  json_2 = xmlhttp.responseText;
                  obj=JSON.parse(json_2);//json string parsed to object
                  for(var i=0;i<obj.length;i++)
                    {
                        str+="<tr>";
                        str+="<td>"+obj[i]["name"]+"</td>";
                        //str+="<td>"+obj[i]["mac_addr"]+"</td>";
                        str+="<td>"+obj[i]["ip_addr"]+"</td>";
                        str+="<td>"+obj[i]["power_id"]+"</td>";
                        str+="<td>"+obj[i]["dev_type"]+"</td>";
                        //str+="<td>"+obj[i]["user_id"]+"</td>";
                        //function that lists rules set for each device is created dynamically here
                        str+='<td><font color ="#ad1457"><span onclick="show_query(this.id)" id="'+obj[i]["ip_addr"]+'">Query</span></font></td>'; 
                        str+='<td><font color ="#6a1b9a"><span onclick="show_status(this.id)" id="'+obj[i]["ip_addr"]+'">View status</span></font></td>';
                        str+="<td>"+obj[i]["query_status"]+"</td>";
                        str+="<td><select id='"+obj[i]["ip_addr"]+"' oninput=control(this.id,this.value)>";
                        str+="<option value='shutdown'>Shutdown</option>";
                        str+="<option value='hibernate'>Hibernate</option>";
                        str+="<option value='turnon'>Turn On</option>";
                        str+="</select></td></tr>";
                    }
                    str+="</table>"
                    $("#device_table").append(str);
                }
            }
            xmlhttp.open("GET","show_dev_table?userid="+val,true);
            xmlhttp.send();
            
          
    }

//redirecting to add_device.js
function redir_dev_lis()
{
     xmlhttp.open("GET","add_device",true);
     xmlhttp.send();
            
    
}

function show_query(val)
{
    xmlhttp.onreadystatechange=function()
            {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    window.location.href='show_query.html';    
                }
        
        }
     xmlhttp.open("GET","save_ip?ip="+val,true);
     xmlhttp.send();  
    
}
