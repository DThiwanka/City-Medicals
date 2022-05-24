const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const bodyParser = require('body-Parser');
const productRoutes = require("./routes/productRoutes")

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/api/products", productRoutes)

const visaRouter = require('./routes/visas.js');
app.use("/visa",visaRouter)

const detailsRouter = require('./routes/details.js');
app.use("/details",detailsRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`☄️  Server running on port ${PORT}`)
});