require('dotenv').config();
console.log(process.env.MONGODB_URI ? 'URI loaded' : 'URI missing');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const {ObjectId} = require('mongodb')

let db, collection;

const url = process.env.MONGODB_URI;
const dbName = "OpportunityApp";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({position: req.body.position, pay: req.body.pay, company: req.body.company, link: req.body.link, apply: req.body.apply, notes: req.body.notes}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})



app.delete('/messages/:id', async (req, res) => {
  
  const result = db.collection('messages').deleteOne({
    _id: new ObjectId(req.params.id)
    
  });

  res.json({ deleted: result.deletedCount});
})

app.put('/messages/:id/apply', async (req, res) =>{
  console.log('hello does this work?')
  const allowed = ['Not Yet', 'Yes', 'No', 'No Longer Accepting Apps'];
  const { apply } = req.body;

    if(!allowed.includes(apply)){
      return res.status(400).json({error: 'Invalid value'})
    }

    await db.collection('messages').updateOne(
      {_id: new ObjectId (req.params.id)},
      {$set: { apply }}
    );
    
    res.json({success: true});
});
