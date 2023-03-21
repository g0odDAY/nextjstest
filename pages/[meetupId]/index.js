
import {BSON, MongoClient} from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props)=>{
    return <>
        <Head>
            <title>{props.meetupData.title}!!!</title>
            <meta name="description" content={props.meetupData.description}/>
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}/>
    </>
}

export default MeetupDetails;
export const getStaticPaths = async (filter, options)=>{
    const client = await MongoClient.connect('mongodb+srv://rbqhr5452:5WpghXo2KK0ewlvK@react.rkihizs.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    await client.close();
    return {
        fallback:false,
        paths:meetups.map(data=>({params:{meetupId:data._id.toString()}}))
    }
}
export const getStaticProps = async context =>{
    const meetupId = context.params.meetupId;
    const nid = new BSON.ObjectId(meetupId)
    const client = await MongoClient.connect('mongodb+srv://rbqhr5452:5WpghXo2KK0ewlvK@react.rkihizs.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: nid  });
    await client.close();

    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                description:selectedMeetup.description,
                image:selectedMeetup.image
            }
        }
    }
}