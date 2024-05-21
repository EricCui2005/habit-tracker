import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { error } from "console";

export async function POST(request: any) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        const habit = searchParams.get('habit');
        if (!habit) {
            return NextResponse.json({error: 'Habit parameter is required'}, {status: 400});
        } else if (!username) {
            return NextResponse.json({error: 'Username parameter is required'}, {status: 400});
        }
        const result = sql `UPDATE users SET habits = array_append(habits, ${habit}) WHERE user = `
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}