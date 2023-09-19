import  Product  from "../models/product.model.js";
import { errorSave } from "../libs/fs-extra.js";

export const getProducts = async (req, res ) => {
    try {
        const Products = await Product.find();
        res.json( Products );
    } catch (error) {
        errorSave( error, req.url );
        return res.status( 500 ).json( { message: error.message} );
    }
}

export const getProduct = async (req, res ) => {
    try {
        const Product = await Product.findById( req.params.id );
        if ( !Product ) return res.status( 404 ).json( { message: 'Product dot found'} ); 
        res.json( Product );
    } catch (error) {
        errorSave( error, req.url );
        return res.status( 500 ).json( { message: error.message} );
    }

}

export const createProducts = async (req, res ) => {
    //const { title, description, availability, category, label, price, image } = req.body;
    const { title, description, availability, category, label, price } = req.body;
    console.log( req.files);
    try {

        const newProduct = new Product({
            title, 
            description, 
            availability, 
            category, 
            label, 
            price, 
            //image
        });

        const productSaved = await newProduct.save();
        
        res.json({
            title: productSaved.title, 
            description: productSaved.description, 
            availability: productSaved.availability, 
            category: productSaved.category, 
            label: productSaved.label, 
            price: productSaved.price, 
            //image: productSaved.image,
            createdAt: productSaved.createdAt,
            updatedAt: productSaved.updatedAt,
        } );
    
    } catch ( error ) {
        errorSave( error, req.url );
        res.status( 500 ).json( { message: error.message } );
        console.log( error );
    }
}

export const deleteProducts = async (req, res ) => {
    try {
        const Product = await Product.findByIdAndDelete( req.params.id );
        if ( !Product ) return res.status( 404 ).json( { message: 'Product dot found'} ); 
        res.json( Product );
    } catch (error) {
        errorSave( error, req.url );
        return res.status( 500 ).json( { message: error.message} );
    }
}

export const updateProducts = async (req, res ) => {
    try {
        const Product = await Product.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        if ( !Product ) return res.status( 404 ).json( { message: 'Product dot found'} ); 
        res.json( Product );
    } catch (error) {
        errorSave( error, req.url );
        return res.status( 500 ).json( { message: error.message} );
    }
}

