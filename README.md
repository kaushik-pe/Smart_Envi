# *** Smart_Envi *** #

Smart_Envi offers the ultimate automation of work environment by managing power consumption. By integrating everything Smart_Envi creates a personalized experience that enhances your business and provides added comfort, savings and convenience.

This repository guides to run Smart_Envi app

### ***Main File***###
                             smart_envi\src\server\server.js
                             smart_envi\src\server\socket_serv.js

### ***How to use?***###


* CLIENT SIDE:

                  *  execute the setup.exe file


* SERVER SIDE:                

                   * In cmd, use the command.

                           $ npm install                   // to install all required modules

                   * node server.js                           // to run the app server(Point your browser to http://localhost:8080)

                    *node socket_serv.js             // to run socket_server 



* DATABASE CONFIGURATION:

                   * Database name  :    smart_envi

                   *  Tables name   :     dev_details 
                                                     dev_query
                                                     users
                                                     dev_group
                                                     dependant_dev


                         ->All the table structure is specified in table specification.rtf