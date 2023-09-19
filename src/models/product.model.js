import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    availability:{
        type: Boolean,
        required: true,
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    label:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
    },
  /*  image:{
        title:{
            type: String,
            required: true,
        },
        url: {
            type: String, 
            required: true,
            validate: {
                validator: function (v) {
                    // Expresión regular para validar el formato de la URL
                    const imageFormatPattern = /\.(png|jpg|jpeg)$/i;
                    return imageFormatPattern.test(v);
                },
                message: 'La URL de la imagen debe ser PNG o JPG (JPEG).',
            },
        },
    },*/
},{
    timestamps: true,
})    

export default mongoose.model('Product', productSchema);