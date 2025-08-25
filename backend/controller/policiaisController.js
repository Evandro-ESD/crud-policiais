import {
    getAllPoliciaisService,
    getPolicialByIdService,
    createPolicialService,
    updatePolicialService,
    deletePolicialService
} from '../services/policiaisService.js';

export const getAllPoliciais = async (req, res) => {
    try {
        const rows = await getAllPoliciaisService();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const getPolicialById = async (req, res) => {
    try {
        const row = await getPolicialByIdService(req.params.id);
        res.json(row);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

export const createPolicialController = async (req, res) => {
    try {
        const novoPolicial = await createPolicialService(req.body);
        res.status(201).json(novoPolicial);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

export const updatePolicialController = async (req, res) => {
    try {
        await updatePolicialService(req.params.id, req.body);
        res.json({ mensagem: 'Policial atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

export const deletePolicialController = async (req, res) => {
    try {
        await deletePolicialService(req.params.id);
        res.json({ mensagem: 'Policial deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};
