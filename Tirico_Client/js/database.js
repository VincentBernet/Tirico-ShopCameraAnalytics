/*


Static class to make the sql connection





*/


// Connection to the DB

var mysql = require('mysql');


class base {

    static con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bdd"
    });

    constructor() {

    };

    static D_connect()
    {
        con.connect(function(err) 
        {
            if (err) 
                throw err;
            console.log("Connected!");
        });
    }
}









