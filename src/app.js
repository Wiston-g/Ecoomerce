import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import { createRoles } from "./libs/initialSetup.js";

//routes
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();

createRoles();

//lib
app.use( bodyParser.json() );
app.use( express.json() ); 
app.use( express.urlencoded() ); 
app.use( fileUpload({
    safeFileNames: false, 
    preserveExtension: 3,
    useTempFiles : true,
    tempFileDir : './src/uploads'
}));
app.use( morgan ( "dev" ) );
app.use( cookieParser() );

//routes
app.use( "/api", authRoutes ); //prefijo para que todas las  rutas de authRoutes empiecen por api
app.use( "/api", productsRoutes ); //prefijo para que todas las  rutas de authRoutes empiecen por api

export default app;

