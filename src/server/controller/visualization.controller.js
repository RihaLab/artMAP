import createLogger from 'debug';
import { Router } from 'express';
import { normalize as normalizePath, resolve as resolvePath } from 'path';
import { pipelineVisualization } from '../service';

const log = createLogger('dna:controller:visualization');
const router = Router();

router.get('/?', async (req, res) => {
  const file = resolvePath(normalizePath(req.query.file));
  log(`Getting graph visualization of a file ${file}`);

  try {
    const result = await pipelineVisualization(file);
    res.json({ graphs: result });
  } catch (err) {
    res.error(err.toString());
  }
});

export default router;
