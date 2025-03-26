import pg from 'pg'


export const pool = new pg.Pool({
    user:"postgres",
    host:"localhost",
    password: "ALONEFOREVER",
    database: "SistemaInformes",
    port: "5432"
})

