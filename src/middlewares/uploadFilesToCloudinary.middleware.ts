import { Request, Response, NextFunction } from 'express';
import cloudinary from '../libs/cloudinary.config';
import multer from 'multer';
import path from 'path';
export default class uploadFilesToCloudinary {

    static storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    static upload = multer({
        storage: this.storage,
        limits: { fileSize: 1024 * 1024 * 10 } // 10MB size limit
    }).any();

    static uploadFiles(folder: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const files = req.files as Express.Multer.File[];

            const uploadPromises = files.map(file => {
                const filenameWithoutExt = path.parse(file.originalname).name;

                return cloudinary.uploader.upload(file.path, {
                    folder: `olympus_athlete/${folder}`,
                    public_id: filenameWithoutExt
                }).then(result => {
                    req.body[file.fieldname + 'Url'] = result.secure_url;
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Upload failed" });
                });
            });

            await Promise.all(uploadPromises);
            next();
        };
    }

}