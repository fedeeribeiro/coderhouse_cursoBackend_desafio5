import { Router } from 'express';
import UsersManager from '../persistence/daos/mongoManagers/UsersManager.js';

const router = Router();
const usersManager = new UsersManager();

router.get('/logout', (req, res) => {
    req.session.destroy( error => {
        if (error) {
            console.log(error);
            res.json({ message: error })
        } else {
            res.json({ message: 'Sesión eliminada con éxito.' });
            res.redirect('/views/login')
        }
    })
});

router.post('/register', async (req, res) => {
    const newUser = await usersManager.createUser(req.body);
    if (newUser) {
        res.redirect('/views/login')
    } else {
        res.redirect('/views/errorRegister')
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersManager.loginUser(req.body);
    if (user.length !== 0) {
        req.session.email = email;
        req.session.password = password;
        res.redirect('/views/products')
    } else {
        res.redirect('/views/errorLogin')
    }
})


export default router;