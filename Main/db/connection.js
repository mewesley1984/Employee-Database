import { createConnection } from 'mysql2';

const connection = createConnection(
    {
     host: 'localhost',
     user: 'root',
     password: 'risa',
     database: 'employee_db'
    } 
 )
 
 export default connection