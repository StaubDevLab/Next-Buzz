import {NextResponse} from "next/server";

export function middleware(request: Request, response: Response) {
    console.log(request, response)
    return NextResponse.next();
}

export const config = {
    matcher :'/news'
}