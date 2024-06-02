'use client';
import React, { useState, useEffect } from 'react';

export default function TaskPage() {

    const [userValue, setUserValue] = useState(''); // Value of username input field
    const [habitValue, setHabitValue] = useState(''); // Value of habit input field
    const [habits, setHabits] = useState([]); // Value of loaded habits array
    const [add, setAdd] = useState(false); // Value to control the add habits field
    const [completedHabits, setCompletedHabits] = useState<{[key: string]: boolean}>({}); // Dictionary representing whether each habit card has been clicked or not
    const [completed, setCompleted] = useState(false); // Controls completion of daily habits

    // Updating user input field
    const handleUsernameChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(event.target.value);
    }

    // Updating habit input field
    const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHabitValue(event.target.value);
    }

    // Handling form submission to fetch habits from endpoint
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Sending a GET request to the API endpoint
        const response = await fetch(`/api/info?username=${encodeURIComponent(userValue)}`);
        const result = await response.json();

        // Updating the habits array and the completed habits dictionary
        setHabits(result[0].habits);
        const habitsInit = habits.reduce((acc: any, curr: any) => {
            acc[curr] = false;
            return acc;
        }, {});
        console.log(completedHabits);
        setCompletedHabits(habitsInit);
    }

    // Handling habit card click
    const handleHabitClick = (habit: string) => {
      setCompletedHabits((prevState: {[key: string]: boolean}) => {
        return {
          ...prevState,
          [habit]: !prevState[habit],
        }
      });
    }

    // Checks if all habits have been completed after each habit click
    useEffect(() => {
      console.log(completedHabits);

      // Extracting the `completedHabits` dictionary into an array of boolean values
      // and using 
      if (Object.values(completedHabits).every((completion: boolean) => completion == true)) {
        setCompleted(true);
      }
      else {
        setCompleted(false);
      }
    }, [completedHabits]);

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
    }

    const toggleAdd = () => {
        setAdd(!add);
    }
    return (
      <div className={`flex flex-col justify-center items-center`}>
        <form className="m-4 flex flex-col items-center gap-6" onSubmit={handleSubmit}>
            <div>
                <label>
                    <input placeholder="Username" className="text-black ml-2 pl-1 rounded-md" type="text" value={userValue} onChange={handleUsernameChange} />
                </label>
            </div>
            <button type="submit" className="border border-solid border-white w-20 rounded bg-blue-400 font-bold text-cente">Submit</button>
        </form>
        <div className="m-4 bg-white w-80 h-80 rounded-md text-black flex flex-col justify-center items-center">
            {habits.map((habit: string) => (
              <button key={habit} className={`m-1 ${completedHabits[habit] ? 'bg-green-300' : 'bg-yellow-300'} w-60 h-10 rounded-md text-black flex flex-col justify-center items-center`} onClick={() => handleHabitClick(habit)}>
                {habit}
              </button>
            ))}
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
        {completed && 
          <div className="m-4 p-4 text-white bg-blue-400 w-80 h-20 border border-solid font-bold border-white rounded-md text-black flex flex-col justify-center items-center">
            <h1>Congratulations! You've completed all your habits for today!</h1>
          </div>}
      </div>
    )
}