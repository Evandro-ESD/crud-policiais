import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    user: 'root',
    password: 'root',
    database: 'crud_policiais',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// // testando conexão
// const [rows] = await pool.execute(`SELECT * FROM policiais`) 
// console.log(rows)


export default pool

