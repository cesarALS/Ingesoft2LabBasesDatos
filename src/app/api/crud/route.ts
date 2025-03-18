import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    await request.json();
    return NextResponse.json({status: 403});
};