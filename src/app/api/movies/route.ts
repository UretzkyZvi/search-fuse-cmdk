import { NextRequest, NextResponse } from "next/server";


async function handler(_req: NextRequest) {
    const response = await fetch('https://playground.mockoon.com/movies');
    const data = await response.json();
    return NextResponse.json(data);
}

export const GET = handler;