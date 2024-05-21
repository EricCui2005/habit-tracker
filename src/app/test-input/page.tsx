'use client';
import React, { useState } from 'react';
import { sql } from '@vercel/postgres';

export default function InputField() {

    // Hooked variables
    const [value, setValue] = useState('');

    // Updating input field
    const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    // Handling form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(`/api/info?username=${encodeURIComponent(value)}`);
        const data = await response.json();
        console.log(data);
    }
    return (

        // Submission form
        <form className="m-2" onSubmit={handleSubmit}>
            <div>

                {/* Name input field */}
                <label>
                    Name: 
                    <input className="text-black ml-2 pl-1" type="text" value={value} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}