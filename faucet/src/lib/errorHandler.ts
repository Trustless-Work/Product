import { NextResponse } from 'next/server';

interface ErrorWithResponse {
    response?: {
        status: number;
    };
}

function isErrorWithResponse(error: unknown): error is ErrorWithResponse {
    return (error as ErrorWithResponse).response !== undefined;
}

export function handleApiError(error: unknown): NextResponse {    
    if (isErrorWithResponse(error)) {
        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Account not found' },
                { status: 404 }
            );
        }
    }

    return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
    );
}