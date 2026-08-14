import { Router } from 'express'
import { getPatternById, listPatterns } from '../controllers/patterns.controller.js'

export const patternsRouter = Router()

patternsRouter.get('/', listPatterns)
patternsRouter.get('/:id', getPatternById)
