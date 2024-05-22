'use client';
import React, { useState } from 'react';

export default function TaskPage() {

    // Value of input field
    const [value, setValue] = useState('');
    const [body, setBody] = useState('');

    // Updating input field
    const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    // Handling form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(`/api/info?username=${encodeURIComponent(value)}`);
        const result = await response.json();
        setBody(result[0].habits);
    }

    const handleAdd = async (event: any) => {
        const response = await fetch(`/api/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'Eric',
            habit: 'Running'
          }),
        });
        console.log(response);
    }
    return (
      <div className="flex flex-col justify-center items-center">
        <form className="m-4 flex flex-col items-center gap-6" onSubmit={handleSubmit}>
            <div>
                <label>
                    <input placeholder="Username" className="text-black ml-2 pl-1 rounded-md" type="text" value={value} onChange={handleChange} />
                </label>
            </div>
            <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Submit</button>
        </form>
        <div className=" m-4 bg-white w-80 h-80 rounded-md">
          <p className="text-black">
            {body}
          </p>
        </div>
        <button onClick={handleAdd} className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-center">Add</button>
      </div>
    )
}