import multer from 'multer';

const storage = multer.diskStorage({});
export const uploadFileMiddleware = multer({ storage }).single('file');
