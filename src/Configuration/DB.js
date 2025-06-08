import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db:process.env.DB_NAME,
})
connection.connect()



export default connection