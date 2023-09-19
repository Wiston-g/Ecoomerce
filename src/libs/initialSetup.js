import Role from "../models/role.model.js";

export const createRoles = async () => {
    try {
        const countRole =await Role.estimatedDocumentCount();
        
        if ( countRole > 0 ) return;
        console.log('buena bobo');
       
        const roles = [
            new Role({ name: 'admin' }).save(),
            new Role({ name: 'customer' }).save(),
            new Role({ name: 'user' }).save(),
        ];
        
        const values = await Promise.all(roles);
    
        console.log( values );
    } catch (error) {
        console.log( error );
    }
}