import express from 'express'
import {
    getAllPoliciais,
    getPolicialById,
    createPolicialController,
    updatePolicialController,
    deletePolicialController
} from '../controller/policiaisController.js'

const router = express.Router()
// rotas para as requisições
router.get('/policiais', getAllPoliciais)
router.get('/policiais/:id', getPolicialById)
router.post('/policiais', createPolicialController)
router.put('/policiais/:id', updatePolicialController)
router.delete('/policiais/:id', deletePolicialController)

export default router