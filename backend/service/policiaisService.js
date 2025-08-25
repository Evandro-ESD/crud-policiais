import { getAll, getId, createPolicial, updatePolicial, deletePolicial } from '../repository/policiaisRepository.js';

export const getAllPoliciaisService = async () => {
    return await getAll();
};

export const getPolicialByIdService = async (id) => {
    const rows = await getId(id);
    if (rows.length === 0) throw new Error('Policial não encontrado!');
    return rows[0];
};

export const createPolicialService = async (policial) => {
    if (!policial.cpf || !policial.matricula) {
        throw new Error('CPF e matrícula são obrigatórios!');
    }
    const sanitizedPolicial = {
        rg_civil: policial.rg_civil ?? null,
        rg_militar: policial.rg_militar ?? null,
        cpf: policial.cpf,
        data_nascimento: policial.data_nascimento ?? null,
        matricula: policial.matricula
    };
    return await createPolicial(sanitizedPolicial);
};

export const updatePolicialService = async (id, policial) => {
    const sanitizedPolicial = {
        rg_civil: policial.rg_civil ?? null,
        rg_militar: policial.rg_militar ?? null,
        cpf: policial.cpf,
        data_nascimento: policial.data_nascimento ?? null,
        matricula: policial.matricula
    };
    return await updatePolicial(id, sanitizedPolicial);
};

export const deletePolicialService = async (id) => {
    return await deletePolicial(id);
};
