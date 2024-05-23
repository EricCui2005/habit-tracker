import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: any) {
    try {
        const { username } = await request.json(); // Extracting username from `body` of request
        if (!username) {
            return NextResponse.json({error: "Username parameter required", status: 400});
        }
        console.log(`Creating a new user with the username ${username}`);

        // Inserting a new user into the database initially with an empty `habits` array
        const result = await sql`INSERT INTO users (username, habits) VALUES (${username}, '{}')`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({error: error.message}, {status: 500});
    }
}