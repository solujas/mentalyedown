import { NextResponse } from 'next/server';

interface Tweet {
  text: string;
  likes: string;
  retweets: string;
  views: string;
  timestamp: string;
}

let tweets: Tweet[] = [];
let tweetCount = 0;
let lastResetDate = new Date().toISOString().split('T')[0];

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  if (today !== lastResetDate) {
    tweets = [];
    tweetCount = 0;
    lastResetDate = today;
  }
  return NextResponse.json({
    tweets,
    remainingTweets: 30 - tweetCount,
    lastResetDate
  });
}

export async function POST(req: Request) {
  const today = new Date().toISOString().split('T')[0];
  if (today !== lastResetDate) {
    tweets = [];
    tweetCount = 0;
    lastResetDate = today;
  }

  if (tweetCount >= 30) {
    return NextResponse.json({ error: 'Daily tweet limit reached' }, { status: 429 });
  }

  const newTweet = await req.json();
  tweets.unshift(newTweet);
  tweetCount++;

  return NextResponse.json({
    tweets,
    remainingTweets: 30 - tweetCount,
    lastResetDate
  });
}