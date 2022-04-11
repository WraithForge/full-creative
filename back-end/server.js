const express = require('express');
const bodyParser = require("body-parser");
//const multer = require('multer')



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
//Enabling CORS
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
})

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: String,
});

const Item = mongoose.model('Item', itemSchema);

app.delete('/api/items/:id', async (req,res) => {
  try {
    await Item.deleteOne({
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/items', async(req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//and an app delete

//I have no idea if this will work, or if I need a different port? Original?
app.listen(3000, () => console.log('Server listening on port 3000!'));
