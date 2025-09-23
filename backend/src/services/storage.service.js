const ImageKit = require("imagekit");
const dotenv = require('dotenv');
dotenv.config();

const imagekit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
});

const uploadFile = async (file, filename) => {
    try {
        const result = await imagekit.upload({
            file: file,
            fileName: filename,
            folder: "/foodReels"
        });
        
        if (!result || !result.url) {
            throw new Error('Upload failed: No URL returned from ImageKit');
        }
        
        return result;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error(`File upload failed: ${error.message}`);
    }
}

module.exports = { uploadFile };