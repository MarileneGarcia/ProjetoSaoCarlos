const router = require('express').Router();
let Noticia = require('./modelo.noticia');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img_noticia');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


// Rota para adicionar uma noticia
router.route('/').get((req, res) => {
    Noticia.find()
        .then(noticias => res.json(noticias))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', upload.single('img'), (req, res) => {
    console.log(req.file);

    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const imagem = req.file.filename;

    console.log('was here');
    const novaNoticia = new Noticia({ titulo, texto, imagem });

    console.log(novaNoticia);
    novaNoticia.save().then(() => {
        res.json('Noticia Adicionada');
        window.alert('Noticia adicionada com sucesso');
    }).catch(err => {
        res.json(err);
        window.alert('A notícia não foi adicionada')
    });

});


// Rota para encontrar uma noticia pelo id
router.route('/:id').get((req, res) => {
    Noticia.findById(req.params.id)
        .then(noticia => res.json(noticia))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Rota para excluir uma noticia pelo id
router.route('/:id').delete((req, res) => {
    Noticia.findByIdAndDelete(req.params.id)
        .then(() => res.json('Noticia deletada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;