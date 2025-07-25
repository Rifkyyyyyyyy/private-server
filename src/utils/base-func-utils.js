import fs from 'fs';
import crypto from 'crypto';

export function generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
}


export const formatImageToBase64 = (image) => {
    if (!image || !image.tempFilePath || !image.mimetype || !image.name) {
        throw new Error('Invalid image format');
    }

    const base64String = fs.readFileSync(image.tempFilePath, { encoding: 'base64' });

    if (!base64String || base64String.length < 50) {
        throw new Error('Image data is empty or too short');
    }

    return {
        name: image.name,
        type: image.mimetype,
        data: `data:${image.mimetype};base64,${base64String}`,
    };
};



export const getPagination = ({ page = 1, limit = 10 }) => {
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    return { skip, limit, metadata: { page, limit } };
};
