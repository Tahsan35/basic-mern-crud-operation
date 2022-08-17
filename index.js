const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user name: dbuser1
// password: PNXeGFDF4YUT41vw 

const uri = "mongodb+srv://dbuser1:PNXeGFDF4YUT41vw@cluster0.8thish1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');
        //get user 
        app.get('/user',async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        // post: add a new user
        app.post('/user', async(req,res) => {
                const newUser = req.body;
                console.log('new user', newUser);
                const result = await userCollection.insertOne(newUser)
                res.send(result);
        });

        // detete a user
        app.delete('/user/:id',async(req,res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('runnign my node crud ');
});

app.listen(port, () =>{
    console.log('crud server is running', port);
});