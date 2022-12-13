import UsersService from "../../services/users.service";
import {UsersModel} from "../../models";
import {SuccessHandlerUtil} from "../../utils";
import AuthService from "../../auth/auth.service";
import session from "express-session";

const express = require('express');
const passport = require('passport');
require('./index');

const app = express();
app.use(session({secret: 'cats', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/google', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']}
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', isLoggedIn, async (req, res,next) => {
    try{
        const {provider, accountId, given_name, family_name, verified, email} = req.user;
        const user = await UsersModel.getByParams({email});
        if(!user){
            const payload = {
                provider,
                accountId,
                first_name:given_name,
                last_name:family_name,
                verified,
                email
            }
           await UsersModel.create(payload);
        }
        const currentUser = await UsersModel.getByParams({email});
        const token = await AuthService.generateToken(currentUser);
        SuccessHandlerUtil.handleAdd(res, next, token);
    }catch (e) {
        next(e)
    }

});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

export default app;