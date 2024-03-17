import React, { useState,useEffect } from 'react';
import axios from 'axios';

function CreateEventForm() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [user_id, setUserId] = useState('');
     useEffect(() => {
    const userIdFromStorage = localStorage.getItem("user_id");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/events/', {
                name: name,
                date: date,
                time: time,
                location: location,
                image: imageURL,
                creator:user_id
            });
            console.log(response.data); // Handle response data as needed
            // Reset form fields after successful submission
            setName('');
            setDate('');
            setTime('');
            setLocation('');
            setImageURL('');
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 py-8 w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter event name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                            Time
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            type="text"
                            placeholder="Enter event location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image URL
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="url"
                            placeholder="Enter event image URL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEventForm;
