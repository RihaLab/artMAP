import createLogger from 'debug';
import { Router } from 'express';
import { normalize as normalizePath, join as joinPaths, resolve as resolvePath } from 'path';
import shell from 'shelljs';

const log = createLogger('dna:controller:fileStructure');

const router = Router();

router.get('/?', (req, res) => {
  const path = resolvePath(normalizePath(req.query.path || '.'));
  log(`Getting file structure of path ${path}`);
  const structure = shell.ls('-lA', path)
    .map(file => mapStatToFile(file, path));
  structure.push(getParent(path));

  res.json({ structure, path });
});

function mapStatToFile(file, path) {
  return {
    name: file.name,
    dateCreated: file.birthtime,
    dateUpdated: file.mtime,
    size: file.size,
    isDirectory: file.isDirectory(),
    path: joinPaths(path, file.name),
  };
}

function getParent(path) {
  return {
    size: 0,
    name: '..',
    isDirectory: true,
    path: normalizePath(joinPaths(path, '..')),
  };
}

export default router;
