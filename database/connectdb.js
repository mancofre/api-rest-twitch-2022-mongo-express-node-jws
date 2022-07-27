import mongoose from "mongoose";

try {
   await mongoose.connect(process.env.URI_MONGO);
   console.log('CONECT BD OK 👍👍👍')
} catch (error) {
    console.log('ERROR AL CONECTAR A BD 🤦‍♂️🤦‍♀️ ', error)
}

