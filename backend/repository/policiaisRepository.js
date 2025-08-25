import mysql2 from 'mysql2/promise';
import pool from './db.js';





const [rows] = await pool.execute(`SELECT * FROM policiais`) 
console.log(rows)