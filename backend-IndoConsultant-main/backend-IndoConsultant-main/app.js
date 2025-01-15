const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
const { authentication } = require('./middleware/authentication')
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload hanya mendukung tipe file - ' + filetypes);
        }
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
    } else if (err) {
        return res.status(500).json({ message: 'Terjadi kesalahan yang tidak diketahui.' });
    }
    next();
});

const controller = require('./Controllers/controller');

app.use('/uploads', express.static(uploadsDir));

// ====== User Routes ====== 
app.post('/login', controller.login);

// ====== Carousel Routes ====== 
app.post('/carousels', authentication, upload.single('gambar'), controller.createCarousel);
app.get('/carousels', controller.readCarousel);
app.put('/carousels/:id', authentication, upload.single('gambar'), controller.updateCarousel);
app.delete('/carousels/:id', authentication, controller.deleteCarousel);

// ====== News Routes ====== 
app.post('/news', authentication, upload.single('gambar'), controller.createNews);
app.get('/news', controller.readNews);
app.put('/news/:id', authentication, upload.single('gambar'), controller.updateNews);
app.delete('/news/:id', authentication, controller.deleteNews);

// ====== Output Routes ====== 
app.post('/outputs', authentication, controller.createOutput);
app.get('/outputs', controller.readOutput);
app.put('/outputs/:id', authentication, controller.updateOutput);
app.delete('/outputs/:id', authentication, controller.deleteOutput);

// ====== Portfolio Routes ====== 
app.post('/portfolios', authentication, upload.single('gambar'), controller.createPortfolio);
app.get('/portfolios', controller.readPortfolio);
app.put('/portfolios/:id', authentication, upload.single('gambar'), controller.updatePortfolio);
app.delete('/portfolios/:id', authentication, controller.deletePortfolio);

// ====== Ruanglingkup Routes ====== 
app.post('/ruanglingkups', authentication, controller.createRuanglingkup);
app.get('/ruanglingkups', controller.readRuanglingkup);
app.put('/ruanglingkups/:id', authentication, controller.updateRuanglingkup);
app.delete('/ruanglingkups/:id', authentication, controller.deleteRuanglingkup);



// Melayani file statis React
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});



app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
