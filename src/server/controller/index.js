import { Router } from 'express';
import fileStructure from './fileStructure.controller';
import visualization from './visualization.controller';

const router = Router();

router.use('/file', fileStructure);
router.use('/visualization', visualization);

export default router;
