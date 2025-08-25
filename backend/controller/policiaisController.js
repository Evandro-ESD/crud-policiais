import { getAll, getId, createPolicial, updatePolicial, deletePolicial } from "../repository/policiaisRepository.js";

import { getAll, getId, createPolicial, updatePolicial, deletePolicial } from './repository/policiaisRepository.js';

// LISTAR TODOS
export const getAllPoliciais = async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar dados!' });
    }
};

// LISTAR POR ID
export const getPolicialById = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await getId(id);
        if (rows.length === 0) return res.status(404).json({ erro: 'Policial não encontrado!' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar policial!' });
    }
};

// CRIAR
export const createPolicialController = async (req, res) => {
    try {
        const policial = req.body;
        const novoPolicial = await createPolicial(policial);
        res.status(201).json(novoPolicial);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// ATUALIZAR
export const updatePolicialController = async (req, res) => {
    try {
        const { id } = req.params;
        const policial = req.body;
        const result = await updatePolicial(id, policial);
        if (result.affectedRows === 0) return res.status(404).json({ erro: 'Policial não encontrado!' });
        res.json({ mensagem: 'Policial atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// DELETAR
export const deletePolicialController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deletePolicial(id);
        if (result.affectedRows === 0) return res.status(404).json({ erro: 'Policial não encontrado!' });
        res.json({ mensagem: 'Policial deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

