import pool from '../config/db.js';


export const getAll = async () => {
    const [rows] = await pool.execute(`select * from policiais`)
    return rows
}
export const getId = async (id) => {
    const [rows] = await pool.execute(`select * from policiais where id = ?`, [id])
    return rows
}
export const createPolicial = async (rg_civil, rg_militar, cpf, data_nascimento, matricula) => {
    const [rows] = await pool.execute(`INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?,?,?,?,?)`, [rg_civil, rg_militar, cpf, data_nascimento, matricula])

    return rows
}
export const updatePolicial = async (id, rg_civil, rg_militar, cpf, data_nascimento, matricula) => {
    const [rows] = await pool.execute(`
        UPDATE policiais SET rg_civil = ?, rg_militar = ?, cpf = ?, data_nascimento = ?, matricula = ? WHERE id = ?`, [rg_civil, rg_militar, cpf, data_nascimento, matricula, id])
    
    return rows
}
export const deletePolicial = async (id) => {
    const [rows] = await pool.execute(`DELETE FROM policiais WHERE id = ?`, [id])
    return rows
}


// console.log(await getAll())
// console.log(await getId(1))
// console.log(await createPolicial('teste', 'teste', 'teste', '2000-01-01', 'teste')) // criado
// console.log(await getAll())
// console.log(await updatePolicial(2, 'testeEdicao', 'teste', 'teste', '2000-01-01', 'teste'))
// console.log(await deletePolicial(2))
