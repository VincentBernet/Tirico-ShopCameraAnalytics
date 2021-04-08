/*


Static class to make the sql connection





*/


// Connection to the DB

function POST(queries) {

    console.log(queries);var mysql = require('mysql');

con = mysql.createConnection({
    host: "mysql-pa8.alwaysdata.net",
    user: "pa8_acc",
    password: "5wtE3Cx8W",
    database: "pa8_bddv2"
    });
console.log("Connected!");
    
con.connect(function(err) 
{
    if (err) 
        throw err;
    console.log("Connected!");
});

}


//module.exports.POST = POST;
module.exports = 'Hello world';
/*
module.exports = {
    POST: POST
}

*/







