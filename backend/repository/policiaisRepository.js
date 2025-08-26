import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const getAll = async () => {
    const [rows] = await pool.execute(`SELECT * FROM policiais`);
    return rows;
};

export const getId = async (id) => {
    const [rows] = await pool.execute(`SELECT * FROM policiais WHERE id = ?`, [id]);
    return rows[0] || null; // retorna null se não achar
};

export const createPolicial = async (dados) => {
    let { rg_civil, rg_militar, cpf, data_nascimento, matricula } = dados;

    // gerar hash da matrícula
    const saltRounds = 10;
    const hashedMatricula = await bcrypt.hash(matricula, saltRounds);

    const [resultado] = await pool.execute(
        `INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?,?,?,?,?)`,
        [rg_civil ?? null, rg_militar ?? null, cpf ?? null, data_nascimento ?? null, hashedMatricula]
    );

    return { id: resultado.insertId, ...dados, matricula: hashedMatricula };
};

export const updatePolicial = async (id, dados) => {
    let { rg_civil, rg_militar, cpf, data_nascimento, matricula } = dados;

    // hash da matrícula se existir
    const hashedMatricula = matricula ? await bcrypt.hash(matricula, 10) : null;

    await pool.execute(
        `UPDATE policiais SET rg_civil = ?, rg_militar = ?, cpf = ?, data_nascimento = ?, matricula = ? WHERE id = ?`,
        [rg_civil ?? null, rg_militar ?? null, cpf ?? null, data_nascimento ?? null, hashedMatricula ?? null, id]
    );

    return { id, ...dados, matricula: hashedMatricula ?? dados.matricula };
};


export const deletePolicial = async (id) => {
    await pool.execute(`DELETE FROM policiais WHERE id = ?`, [id]);
    return { id };
};


// console.log(await getAll())
// console.log(await getId(1))
// console.log(await createPolicial('teste', 'teste', 'teste', '2000-01-01', 'teste')) // criado
// console.log(await getAll())
// console.log(await updatePolicial(2, 'testeEdicao', 'teste', 'teste', '2000-01-01', 'teste'))
// console.log(await deletePolicial(2))
