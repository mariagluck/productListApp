import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './models/product.js';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connection.on('error',        (e) => console.log(">> MONGO Error!", e));
mongoose.connection.on('connecting',    () => console.log(">> MONGO Connecting"));
mongoose.connection.on('connected',    () => console.log(">> MONGO Connected"));
mongoose.connection.on('disconnecting', () => console.log(">> MONGO Disconnecting"));
mongoose.connection.on('disconnected',  () => console.log(">> MONGO Disconnected"));


const cs ="mongodb://mariamart:passW0rd@localhost:27017/mariamartdb";
await mongoose.connect(cs);

app.get('/products', async (req, res) => {
    const product = await Product.find();
    res.json(product);
});

app.post('/products', (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then(() => { 
            console.log("product saved");
            res.send({ message: "All good"});
        })
        .catch((err) => {
            console.log("ERROR DURING PRODUCT SAVING", err);
            res.status(400);
            res.send({ message: "All bad"});
        });
    // res.send({message: "All good" });
})

app.delete('/products/:productId', (req, res) => {
    Product.deleteOne({ _id: req.params.productId })
       .then(result => {
           console.log(result);
           res.send({ message: "All very good" });
       })
       .catch(error => {
           console.log("Error when deleting", error);
           res.status(400);
           res.send({ message: "all Very bad"});
       })

})

app.listen(3333, () => {
    console.info('App listening on http://localhost:3333');
})
