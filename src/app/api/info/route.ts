import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Turning off caching
export const fetchCache = "force-no-store";

export async function GET(request: any) {
    try {

        // Extracting query parameters
        const { searchParams } = new URL(request.url);

        // Extracting username from query parameters
        const username = searchParams.get('username');

        // Error handling
        if (!username) {
            return NextResponse.json({ error: 'Username parameter is required' }, { status: 400 });
        }
        console.log(`Fetching habit data for ${username}`);

        // SQL query using `username`
        const result = await sql`SELECT * FROM users WHERE username = ${username};`;
        return NextResponse.json(result.rows);
        
        // Error catching
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
