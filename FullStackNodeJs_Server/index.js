import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreatValidation } from './validations.js';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';


mongoose.connect('mongodb+srv://sergeyif1:wwww@cluster0.yxlngxp.mongodb.net/blog?retryWrites=true&w=majority', 
)
.then(() => {
    console.log('DB Ok!');    
}).catch((err) => {
    console.log('DB error!', err); 
});


const app = express ();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
// Creat new the rout
//Когда ты создаеш свое RestAPI и у тебя есть КРУТ  криейт риде апдейт делит бест практис указывать что у тебя есть один путь,а там есть куча методов для него/ Есть нормально сформированные GET запросы 

app.post('/upload/', checkAuth, upload.single('image'), (req, res) => 
    res.json({
        url: `/uploads/${req.file.originalname}`,
  })
);

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);                     //получение всех статей. Здесь авторизация не нужна. Здесь надо получить просто все статьи
app.get('/posts/tags', PostController.getLastTags);             
app.get('/posts/:id', PostController.getOne);          //Нужна одна статья. Поэтому / и динамический параметр (:)id (но можно назвать как угодно)
app.delete('/posts/:id', checkAuth, PostController.remove);//Когда мне надо удалить стаью я передаю the delete metod
app.patch('/posts/:id', checkAuth,  postCreatValidation,    PostController.update); //Когда мне надо сделать обновление стаьи я передаю the patch metod
app.post('/posts', checkAuth, postCreatValidation, handleValidationErrors, PostController.create);   //Когда я хочу создать статью я передаю post запрос


app.listen(4444, (err) => {
    if(err) {
        return console.log('err!');
    };
    console.log('Server Ok!');
});