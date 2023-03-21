import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";
const NewMeetup = ()=>{
    const router = useRouter();
    const addMeetup = async meetupData =>{
        console.log(meetupData);
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(meetupData)
        });
        const data = await response.json();
        console.log(data);
        await router.push('/');
    }
    return <>
        <Head>
            <title>Add a New Meetup!</title>
            <meta name="description" content="adding new meetup page!"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetup}/>
    </>
}
export default NewMeetup;