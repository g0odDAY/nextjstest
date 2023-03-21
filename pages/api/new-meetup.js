//api/new-meetup
// POST요청 일 때만 코드를 트리거

import {MongoClient} from'mongodb';
const handler= async (req,res)=>{
    if(req.method==='POST'){
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://rbqhr5452:5WpghXo2KK0ewlvK@react.rkihizs.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        await client.close();
        res.status(201).json({message:'Meetups inserted!'});
    }
}
export default handler;