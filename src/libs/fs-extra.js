//import  fse  from "fs-extra";
import { appendFile } from 'node:fs';




//fs.mkdirSync(dirPath);

/*export const renameImage = ( tempFilePath, mimetype) =>{

    //const rename = fse.rename()

    
}*/

export const errorSave = ( dataError, endpoint ) => {
    
    try {
        
        const file = 'src/schemas/errors.txt' ;
        ;
        let  text = '  The enpoint  ' + endpoint + JSON.stringify(dataError);  

        appendFile( file, text,  ( error ) => {
            if ( error ) {
                console.error('Error al agregar texto al archivo:', error);
            } else {
                console.log('Texto agregado al archivo con éxito.');
            }
        });
    
    } catch (error) {
        return console.log( error );
    }
}