import { getAll, getId, createPolicial, updatePolicial, deletePolicial } from './policiaisRepository.js';

// LISTAR TODOS
export const getAllPoliciaisService = async () => {
    return await getAll();
};

// LISTAR POR ID
export const getPolicialByIdService = async (id) => {
    const rows = await getId(id);
    if (rows.length === 0) throw new Error('Policial não encontrado!');
    return rows[0];
};

// CRIAR
export const createPolicialService = async (policial) => {
    if (!policial.rg_civil || !policial.rg_militar || !policial.cpf || !policial.matricula || !policial.data_nascimento ) {
        throw new Error('Todos os campos são obrigatórios!');
    }

    return await createPolicial(policial);
};

// ATUALIZAR
export const updatePolicialService = async (id, policial) => {
    // valida obrigatórios se quiser
    if (!policial.rg_civil || !policial.rg_militar || !policial.cpf || !policial.matricula || !policial.data_nascimento ) {
        throw new Error('Todos os campos são obrigatórios!');
    }

    const policialEditado = {
        rg_civil: policial.rg_civil,
        rg_militar: policial.rg_militar,
        cpf: policial.cpf,
        data_nascimento: policial.data_nascimento,
        matricula: policial.matricula
    };

    return await updatePolicial(id, policialEditado);
};

// DELETAR
export const deletePolicialService = async (id) => {
    return await deletePolicial(id);
};
