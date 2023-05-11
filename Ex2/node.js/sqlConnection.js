   // Importing module
   const  mysql = require('mysql2')
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        port:3306,
        password: "123456",
        database: "coronareservoir"
    })

    // Connecting to database
    connection.connect(function (err) {
        if (err) {
            console.log("Error in the connection",err)
        }
        else {
            console.log(`Database Connected`)
        }
    })
module.exports = connection

