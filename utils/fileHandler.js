import fs from 'fs';

export const readFile = (path) => fs.readFileSync(path, 'utf8');
export const writeFile = (path, data) => fs.writeFileSync(path, data);
export const deleteFile = (path) => fs.unlinkSync(path);
