import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/productDB');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const Product = mongoose.model('Product', productSchema);
app.get('/', (req, res) => {
    res.send(`
        <h1>Product Management</h1>
        <h2>Admin Login</h2>
        <form action="/login" method="POST">
            <input
                type="text"
                name="username"
                placeholder="Username"
                required>
            <br><br>
            <input
                type="password"
                name="password"
                placeholder="Password"
                required>
            <br><br>
            <button>
                Login
            </button>
        </form>
        <hr>
        <a href="/products">
            View Products
        </a>
    `);
});
app.post('/login', (req, res) => {

    if (
        req.body.username === 'admin'
        &&
        req.body.password === '123'
    ) {

        const token = jwt.sign(

            {
                role: 'admin'
            },

            'secret'
        );

        res.send(`

            <h2>Admin Login Successful</h2>

            <p>Token:</p>

            <textarea rows="5" cols="60">
${token}
            </textarea>

            <br><br>

            <a href="/add-product-page?token=${token}">
                Add Product
            </a>

        `);

    } else {

        res.send('Invalid Credentials');

    }

});

/*
------------------------------
AUTH MIDDLEWARE
------------------------------
*/

function auth(req, res, next) {

    const token = req.query.token;

    if (!token) {

        res.send('Token Missing');

        return;
    }

    try {

        const data = jwt.verify(token, 'secret');

        req.user = data;

        next();

    } catch {

        res.send('Invalid Token');

    }

}

/*
------------------------------
ADMIN MIDDLEWARE
------------------------------
*/

function adminOnly(req, res, next) {

    if (req.user.role !== 'admin') {

        res.send('Access Denied');

        return;
    }

    next();

}

/*
------------------------------
ADD PRODUCT PAGE
------------------------------
*/

app.get(

    '/add-product-page',

    auth,

    adminOnly,

    (req, res) => {

        res.send(`

            <h1>Add Product</h1>

            <form
                action="/add-product?token=${req.query.token}"
                method="POST"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    required
                >

                <br><br>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                >

                <br><br>

                <button>
                    Add Product
                </button>

            </form>

        `);

    }

);

/*
------------------------------
ADD PRODUCT
------------------------------
*/

app.post(

    '/add-product',

    auth,

    adminOnly,

    (req, res) => {

        const product = new Product({

            name: req.body.name,

            price: req.body.price

        });

        product.save()

        .then(() => {

            res.send('Product Added');

        });

    }

);

/*
------------------------------
VIEW PRODUCTS
------------------------------
*/

app.get('/products', (req, res) => {

    Product.find()

    .then((products) => {

        let output = '<h1>Products</h1>';

        products.forEach((p) => {

            output += `

                <p>
                    ${p.name}
                    -
                    Rs.${p.price}
                </p>

            `;

        });

        res.send(output);

    });

});

/*
------------------------------
SERVER
------------------------------
*/

app.listen(3000);