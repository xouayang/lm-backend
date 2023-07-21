const firebase = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../firebase/firebase.config.json');

const multer = require('multer');
const routes = require('express').Router();

const upload = multer({ storage: multer.memoryStorage() });

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

routes.post('/single', upload.single('file'), async (req, res) => {
    try {
        const folder = 'Single_image';
        const fileName = `${folder}/${req.file.originalname}`;
        const storageRef = ref(storage, fileName);
        const metadata = {
            contentType: req.file.mimetype
        };
        const snapshot = uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL((await snapshot).ref);
        res.status(200).json({
            message: 'Upload success',
            fileName: req.file.originalname,
            url: downloadURL
        });
    } catch (error) {
        res.status(405).json({
            message: error
        });
    }
});

routes.post('/multiple', upload.array('files'), async (req, res) => {
    try {
        const folder = 'Multiple_images';
        const uploadPromises = req.files.map(async (file) => {
            const fileName = `${folder}/${file.originalname}`;
            const storageRef = ref(storage, fileName);
            const metadata = {
                contentType: file.mimetype
            };
            const snapshot = uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL((await snapshot).ref);
            return {
                originalName: file.originalname,
                url: downloadURL
            };
        });
        const uploadResults = await Promise.all(uploadPromises);

        res.status(200).json({
            message: 'Upload success',
            files: uploadResults
        });
    } catch (error) {
        res.status(405).json({
            message: error
        });
    }
});

module.exports = routes;