const express = require('express');
const mongoose = require('mongoose');
const rotaNoticias = require('./rota.noticia');


const app = express();
const port = 3003;

app.use(express.json());
app.use('/noticias', rotaNoticias);

const uri = "mongodb+srv://maisDi:DmuhFN5uMG1ny9BN@maisdi.chs5h.mongodb.net/maisdi?retryWrites=true;"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port} e uri ${uri}`);
});