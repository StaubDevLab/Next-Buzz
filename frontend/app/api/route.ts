export function GET(request: Request) : Response {
    console.log(request);
    return new Response('Hello')
}