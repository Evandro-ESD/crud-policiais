import bcrypt from 'bcrypt';
import {    getAll, 
            getId, 
            createPolicial, 
            updatePolicial, 
            deletePolicial 
} from '../repository/policiaisRepository.js';
export const getAllPoliciaisService = async () => {
    return await getAll();
};

export const getPolicialByIdService = async (id) => {
    const policial = await getId(id);
    if (!policial) throw new Error('Policial não encontrado');
    return policial;
};

export const createPolicialService = async (dados) => {
    return await createPolicial(dados);
};

export const updatePolicialService = async (id, dados) => {
    const policialExistente = await getId(id);
    if (!policialExistente) throw new Error('Policial não encontrado');

    return await updatePolicial(id, dados);
};

export const deletePolicialService = async (id) => {
    const policialExistente = await getId(id);
    if (!policialExistente) throw new Error('Policial não encontrado');

    return await deletePolicial(id);
};
