/* eslint-disable @typescript-eslint/no-unused-vars */

import { type NextRequest, NextResponse } from 'next/server';

const GITBOOK_API_URL = 'https://api.gitbook.com/v1/spaces';
const GITBOOK_API_TOKEN = process.env.GITBOOK_API_TOKEN;
const GITBOOK_SPACE_ID = process.env.GITBOOK_SPACE_ID;

export async function POST(request: NextRequest) {
  if (!GITBOOK_API_TOKEN || !GITBOOK_SPACE_ID) {
    return NextResponse.json(
      { error: 'Missing GitBook API token or space ID' },
      { status: 500 }
    );
  }

  try {
    const { query } = await request.json();

    const response = await fetch(`${GITBOOK_API_URL}/${GITBOOK_SPACE_ID}/search/ask?format=markdown&details=true`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITBOOK_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to fetch answer from GitBook AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}