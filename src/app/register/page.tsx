'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
    const [userValue, setUserValue] = useState(''); // Value of username input field
    const [habitValue, setHabitValue] = useState(''); // Value of habit input field

    // Updating user input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.placeholder == "Username") {
            setUserValue(event.target.value);
        } else if (event.target.placeholder == "Habit") {
            setHabitValue(event.target.value);
        }
    }

    // Form submission handling
    const handleSubmitUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Creating a new user
        const response = await fetch('/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userValue,
            })
        })
        console.log(response.json());
    }

    const handleSubmitHabit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userValue,
                habit: habitValue,
            })
        });
        console.log(response.json());
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmitUser} className="flex flex-col justify-center items-center gap-4 mt-4">
                <div>
                    <label>
                        <input placeholder="Username" className="text-black ml-2 pl-1 rounded-md" type="text" onChange={handleInputChange} value={userValue}/>
                    </label>
                </div>
                <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">New User</button>
            </form>
            <form onSubmit={handleSubmitHabit} className="flex flex-col justify-center items-center gap-4 mt-4">
                <div>
                    <label>
                        <input placeholder="Habit" className="text-black ml-2 pl-1 rounded-md" type="text" onChange={handleInputChange} value={habitValue}/>
                    </label>
                </div>
                <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Add Habit</button>
            </form>
        </div>
    )
}