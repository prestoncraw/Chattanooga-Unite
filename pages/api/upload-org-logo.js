const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

async function handler(req, res) {
    try {
        await runMiddleware(req, res, upload.single("logo"))
        
        let encodedImage = req.file.buffer.toString('base64');
        console.log(encodedImage);
        return res.json({ message: 'Successfully uploaded image.' })


    } catch (e) {
        /* handle error */
        console.error(e);
        console.error(`error occurred when uploading image`);
        return res.status(500).json({ message: 'Error occurred when uploading image' });
    }
    
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler
