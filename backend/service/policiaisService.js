import bcrypt from 'bcrypt';
import { getAll, getId, createPolicial, updatePolicial, deletePolicial } from '../repository/policiaisRepository.js';

export const getAllPoliciaisService = async () => {
    return await getAll();
};

export const getPolicialByIdService = async (id) => {
    const rows = await getId(id);
    if (rows.length === 0) throw new Error('Policial não encontrado!');
    return rows[0];
};


// encriptografar o campo matricula com bcrypt




export const createPolicialService = async (policial) => {
    if (!policial.rg_civil && !policial.rg_militar || !policial.cpf || !policial.data_nascimento || !policial.matricula) {
        throw new Error('Rg Civil, rg Militar, CPF e matrícula são obrigatórios!');
    }

    const saltRounds = 10; 
    const hashedMatricula = await bcrypt.hash(policial.matricula, saltRounds);

    const novoPolicial = {
        rg_civil: policial.rg_civil ,
        rg_militar: policial.rg_militar,
        cpf: policial.cpf,
        data_nascimento: policial.data_nascimento,
        matricula: hashedMatricula
    };
    return await createPolicial(novoPolicial);
};

export const updatePolicialService = async (id, policial) => {
     if (!policial.rg_civil && !policial.rg_militar || !policial.cpf || !policial.data_nascimento || !policial.matricula) {
        throw new Error('Todos os campos são obrigatórios!');
    }
    const policialEditado = {
        rg_civil: policial.rg_civil ,
        rg_militar: policial.rg_militar,
        cpf: policial.cpf,
        data_nascimento: policial.data_nascimento,
        matricula: policial.matricula
    };
    return await updatePolicial(id, policialEditado);
};

export const deletePolicialService = async (id) => {
    return await deletePolicial(id);
};
