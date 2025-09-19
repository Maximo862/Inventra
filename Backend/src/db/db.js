const mysql = require("mysql2/promise")

const pool = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "root08", 
    database: "inventorymanagement"
})

module.exports = {
    pool
}