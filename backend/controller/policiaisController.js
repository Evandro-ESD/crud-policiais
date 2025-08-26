import {
    getAllPoliciaisService,
    getPolicialByIdService,
    createPolicialService,
    updatePolicialService,
    deletePolicialService
} from '../services/policiaisService.js';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';


export const getAllPoliciais = async (req, res) => {
    try {
        const policiais = await getAllPoliciaisService();
        res.json(policiais);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const getPolicialById = async (req, res) => {
    try {
        const policial = await getPolicialByIdService(req.params.id);
        res.json(policial);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
};

export const createPolicialController = async (req, res) => {
    try {

        const { cpf } = req.body;

        if (!cpfValidator.isValid(cpf)) {
            return res.status(400).json({ erro: 'CPF inválido' });
        }
        const novoPolicial = await createPolicialService(req.body);
        res.status(201).json(novoPolicial);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

export const updatePolicialController = async (req, res) => {
    try {
        const policialAtualizado = await updatePolicialService(req.params.id, req.body);
        res.json(policialAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

export const deletePolicialController = async (req, res) => {
    try {
        const policialDeletado = await deletePolicialService(req.params.id);
        res.json(policialDeletado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};
