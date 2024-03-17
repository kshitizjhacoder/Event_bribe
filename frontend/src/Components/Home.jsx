import React, { useState, useEffect } from 'react';
import axios from  "axios";
import CreateEventForm from './CreatEventForm';
import { Link } from 'react-router-dom';


function Home() {
  const [user_id, setUserId] = useState('');
  const [showGlobalEvents, setShowGlobalEvents] = useState(true);
  const [createEvent, setcreateEvent] = useState(false);
  const [globalEvents, setGlobalEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  // Get user id on page load
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("user_id");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);
    const handlecreateEvent = () => {
        setcreateEvent(true);
    }   
    const handleglobalevents = () => {
        console.log(showGlobalEvents);
        setShowGlobalEvents(!showGlobalEvents);
        setcreateEvent(false);
    }
    useEffect(() => {
        fetchGlobalEvents();
      fetchCreatedEvents();
    }, [])
    const fetchGlobalEvents = async() => {
        try {
            const res =  await axios.get('http://127.0.0.1:8000/events/');
            // console.log(res.data);
            setGlobalEvents(res.data);
        } catch (err) {
            console.log(err);
        }
    
  };

  const fetchCreatedEvents = async () => {
    console.log(user_id);
    try {
      const res = await axios.get(`http://localhost:8000/events/?user_id=${user_id}`);
      // console.log(res.data);
      setCreatedEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const LikeEvents = async (eventId, userId) => {
  try {
    const res =  await axios.post(`http://localhost:8000/likes/${eventId}/${userId}`);
    // Handle the response as needed
  } catch (error) {
    console.log(error);
  }
};
    const eventsToShow = showGlobalEvents ? globalEvents : createdEvents;

  return (
    <div>
          <Navbar showGlobalEvents={showGlobalEvents} handleglobalevents={handleglobalevents} handlecreateEvent={handlecreateEvent} />
          {createEvent?<CreateEventForm/>:<div className="container mx-auto px-4 py-8">
        <div className="flex justify-center w-full">
          <div className="flex flex-col">
            {eventsToShow.map((event,index) => (
              <EventCard key={event.id} index={index} event={event} user_id={user_id} LikeEvents={LikeEvents} />
            ))}
          </div>
        </div>
      </div>}
      
    </div>
  );
}

function Navbar({ handleglobalevents, showGlobalEvents, handlecreateEvent }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_email');
    setUserEmail('');
  };

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3">
      <h1 className="text-red-400 font-bold text-xl">EventBribe</h1>
      <div>
        <button className="text-black-500 font-semibold mr-4" onClick={!showGlobalEvents ? handleglobalevents : undefined}>Global Event</button>
        <button className="text-black-500 font-semibold mr-4" onClick={showGlobalEvents ? handleglobalevents : undefined}>Created Event</button>
        <button className="text-black-500 font-semibold mr-4" onClick={handlecreateEvent}>Create Event</button>
        {userEmail ? (
          <>
            <span className="text-black-500 font-semibold mr-4">{userEmail}</span>
            <button className="text-black-500 font-semibold mr-4" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-black-500 font-semibold">Log in</Link>
        )}
      </div>
    </nav>
  );
}

function EventCard({ event,index, LikeEvents, user_id }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    LikeEvents(index+1, user_id);
    setLiked(true);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6 flex items-center justify-between">
      <div className="mr-6">
        <img src={event.image} alt="Event" className="w-32 h-auto" />
      </div>
      <div className="flex-1 mr-6">
        <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
        <p className="text-gray-500 mb-2">Date: {event.date}</p>
        <p className="text-gray-500 mb-2">Location: {event.location}</p>
      </div>
      <button
        className="bg-transparent border-none"
        onClick={handleLike}
        style={{ color: liked ? 'red' : 'black' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={liked ? 'red' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6s-8 5.5-8 8a4 4 0 0 0 4 4c1.213.003 2.293-.547 3-1.414C11.707 17.453 12.787 18 14 18c2.21 0 4-2.686 4-6s-1.79-6-4-6z"
          />
        </svg>
      </button>
    </div>
  );
}
export default Home;
