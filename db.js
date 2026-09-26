import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbz_api',
  password: 'qwertyuiop-123456789', // Cambia esto por tu clave real
  port: 5432,
});

pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos PostgreSQL');
});