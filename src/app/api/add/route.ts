import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: any) {
    try {
        const { username, habit } = await request.json();
        console.log(username, habit);
        if (!habit) {
            return NextResponse.json({error: 'Habit parameter is required'}, {status: 400});
        } else if (!username) {
            return NextResponse.json({error: 'Username parameter is required'}, {status: 400});
        }
        const result = sql `UPDATE users SET habits = array_append(habits, ${habit}) WHERE username = ${username};`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}