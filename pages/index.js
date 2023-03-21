import MeetupList from "../components/meetups/MeetupList";
import {useEffect} from "react";
import {MongoClient} from "mongodb";
import Head from "next/head";

const DUMMY_MEETUP =[
  {
    id:'m1',
    title:'A first meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address:'Some address 10, 12345 Some City',
    description:'this is first meetup!!'
  },
  {
    id:'m2',
    title:'A Second meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address:'Some address 10, 12345 Some City',
    description:'this is Second meetup!!'
  }
]
const HomePage=(props)=>{
  useEffect(()=>{
    const response = fetch('https://developer-lostark.game.onstove.com/armories/characters/규위게/profiles',{
      headers:{
        accept:'application/json',
        authorization : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNzUwMzYifQ.QLDqQWrSXV2PN_oJnZ799LlVcsJ1jAjGwRLOSxIeWGyqUH2hCYCjONlsygYgDUCz7UsnVffNHFmA6gT9JX1EO-o_sdjLC6xsn3UZrLn-wmGYKpsfFzplRPZoo2HHYmblZDfrOIUKYZDCg7OMS8pJ1uRAA-5j3n9FQSM1n3vl2pFBxkXFKQbQERtiljwYFEFpaZeBsMgi2LjzTG1aKXW-5qDheiiaADrOKni95PTIy0vs4pP8QKeI-LMq1nqGb0OgnTTDg8mJIXePv4YJiDXGgDMefRFgB7Dei-1Hgn7I-mLmspsX5OZjiIs84yjZMLhXKiJK78fQux9bcOZL-hQwMQ'
      }
    }).then(response=>{
      return response.json();
    }).then(data=>{
      console.log(data);
    })

  },[])

  return<>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Browse a huge list of highly active React Meetups!"/>
    </Head>
    <MeetupList meetups={props.meetups}/>
  </>;
}
export default HomePage;
// export const getServerSideProps = context =>{
//     return {
//         props:{
//             meetups:DUMMY_MEETUP
//         }
//     }
// }

export const getStaticProps = async ()=>{
  const client = await MongoClient.connect('mongodb+srv://rbqhr5452:5WpghXo2KK0ewlvK@react.rkihizs.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await  meetupsCollection.find().toArray();
  await client.close();
  return {
    props:{
      meetups:meetups.map(data=>({
        title:data.title,
        address:data.address,
        image:data.image,
        id:data._id.toString()
      })),
    },
    revalidate:1
  }
}