import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Role from "../models/role.model.js";

import { createAccessToken } from "../libs/jwt.js";
import { errorSave } from "../libs/fs-extra.js";

export const register = async (req, res) => {

    const { userName, email, password, rol } = req.body;
    try {

        const passwordHash = await bcrypt.hash( password.toString(), 10 );

        const newUser = new User({
            userName,
            email,
            password: passwordHash,
        });
        
        if ( rol ) {
            const rolesFound = await Role.find( { name: { $in: rol } } );
            newUser.rol = rolesFound.map( role => role._id ); 
        }else{
            const role = await Role.findOne( { name: "user" } );
            newUser.rol = [ role._id ]; 
        }

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id })
        
        res.cookie( 'token', token )
        res.json({
            id: userSaved._id,
            userName: userSaved.userName,
            email: userSaved.email,
            rol: userSaved.rol,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        } );
    
    } catch ( error ) {
        errorSave( error, req.url );
        res.status( 500 ).json( { message: error.message } );
    }

};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userFound = await User.findOne( { email } ).populate( "rol" ); 

        if ( !userFound ) return res.status( 400 ).json({ message: "User not found"});

        const isMach = await bcrypt.compare( password.toString(), userFound.password );

        if ( !isMach ) return res.status( 400 ).json({ message: "User or password incorrect"});        


        const token = await createAccessToken({ id: userFound._id })
        
        res.cookie( 'token', token )
        res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            rol: userFound.rol,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        } );

    } catch ( error ) {
        errorSave( error, req.url );
        res.sendStatus( 500 ).json( { message: error.message } );
    }

};

export const logout = (req, res) => {
    res.cookie( 'token ', "",{
        expires: new Date(0)
    });
    return res.sendStatus( 200 )
};

export const profile = async (req, res) => {
    const userFound = await User.findById( req.user.id );

    if( !userFound) return res.status( 400 ).json( { message: 'User Not Found' } );

    return res.json({
        id: userFound._id,
        userName: userFound.userName,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

};