import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты / Email format does wronge').isEmail(),
    body('password', 'Password must be not less 5th characters').isLength({min: 5}),
];

export const registerValidation = [
    body('email', 'Неверный формат почты / Email format does wronge').isEmail(),
    body('password', 'Password must be not less 5th characters').isLength({min: 5}),
    body('fullName', 'You indicat full name, please').isLength({min: 3}),
    body('avatarUrl', 'Link avatarn does wronge').optional().isURL(),

];

export const postCreatValidation = [
    body('title', 'Введите заголовок статьи / You add the articles title').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи / You add the article text').isLength({min: 10}).isString(),
    body('tegs', 'Неверный формат тэгов / The tags format is wronge').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение / The link on image is wronge').optional().isString(),
];

