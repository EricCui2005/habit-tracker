'use client';
import React, { useState } from 'react';

export default function TaskPage() {

    const [userValue, setUserValue] = useState(''); // Value of username input field
    const [habitValue, setHabitValue] = useState(''); // Value of habit input field
    const [body, setBody] = useState(''); // Value of info body
    const [add, setAdd] = useState(false); // Value to control the add habits field

    // Updating user input field
    const handleUsernameChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(event.target.value);
    }

    // Updating habit input field
    const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHabitValue(event.target.value);
    }

    // Handling form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(`/api/info?username=${encodeURIComponent(userValue)}`);
        const result = await response.json();
        setBody(result[0].habits);
    }

    // Adding a habit to a user's habit list
    const handleAdd = async (event: any) => {
        event.preventDefault();
        // Sending a POST request to the API endpoint
        const response = await fetch(`/api/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userValue,
            habit: habitValue,
          }),
        });
        console.log(response);
    }

    const toggleAdd = () => {
        setAdd(!add);
    }
    return (
      <div className="flex flex-col justify-center items-center">
        <form className="m-4 flex flex-col items-center gap-6" onSubmit={handleSubmit}>
            <div>
                <label>
                    <input placeholder="Username" className="text-black ml-2 pl-1 rounded-md" type="text" value={userValue} onChange={handleUsernameChange} />
                </label>
            </div>
            <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Submit</button>
        </form>
        <div className=" m-4 bg-white w-80 h-80 rounded-md">
          <p className="text-black">
            {body}
          </p>
        </div>
        <button onClick={toggleAdd} className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Add</button>
        {add && <form className="m-4 flex flex-col items-center gap-6" onSubmit={handleAdd}>
            <div>
                <label>
                    <input placeholder="Habit" className="text-black ml-2 pl-1 rounded-md" type="text" value={habitValue} onChange={handleHabitChange} />
                </label>
            </div>
            <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Submit</button>
        </form>}
      </div>
    )
}