import { Request, Response, NextFunction } from 'express';
import cloudinary from '../libs/cloudinary.config'; // Asegúrate de que esta ruta sea correcta
import multer from 'multer';
import path from 'path';

export class UploadCloudinary {
    static storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    static upload = multer({ storage: this.storage });

    static Uploadfile(folder: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (req.file && req.file.path) {
                const filenameWithoutExt = path.parse(req.file.originalname).name;
                cloudinary.uploader.upload(req.file.path, {
                    folder: `olympus_athlete/${folder}`,
                    public_id: filenameWithoutExt
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Upload failed" });
                    }
                    req.body.image = result?.secure_url;
                    console.log(result);
                    
                    next();
                });
            } else {
                res.status(400).json({ error: "No file uploaded" });
            }
        }
    }
}
