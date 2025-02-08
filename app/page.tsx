'use client';

import { useState, useEffect } from 'react';

type Post = {
  text: string;
  timestamp: string;
  likes: string;
  retweets: string;
  views: string;
};

const DAILY_TWEET_LIMIT = 30;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [remainingTweets, setRemainingTweets] = useState(DAILY_TWEET_LIMIT);
  const [newPost, setNewPost] = useState({
    text: '',
    likes: '0',
    retweets: '0',
    views: '0',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('/api/tweets');
      const data = await response.json();
      setPosts(data.tweets);
      setRemainingTweets(data.remainingTweets);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (remainingTweets <= 0) {
      alert('Daily tweet limit reached! Please try again tomorrow.');
      return;
    }

    try {
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to post tweet');
      }

      const data = await response.json();
      setPosts(data.tweets);
      setRemainingTweets(data.remainingTweets);
      setNewPost({
        text: '',
        likes: '0',
        retweets: '0',
        views: '0',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <main className="max-w-xl mx-auto">
        <h1 className="text-4xl mb-8 text-center font-playfair">
          mental (ye)<span className="inline-block animate-droop">down</span>
        </h1>
        <form onSubmit={handleSubmit} className="mb-8 p-4 border border-gray-800 rounded-lg">
          <textarea
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            className="w-full bg-black text-white border border-gray-800 rounded p-2 mb-4"
            placeholder="What's happening?"
            rows={4}
          />
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={newPost.likes}
              onChange={(e) => setNewPost({ ...newPost, likes: e.target.value })}
              className="bg-black text-white border border-gray-800 rounded p-2"
              placeholder="Likes"
            />
            <input
              type="text"
              value={newPost.retweets}
              onChange={(e) => setNewPost({ ...newPost, retweets: e.target.value })}
              className="bg-black text-white border border-gray-800 rounded p-2"
              placeholder="Retweets"
            />
            <input
              type="text"
              value={newPost.views}
              onChange={(e) => setNewPost({ ...newPost, views: e.target.value })}
              className="bg-black text-white border border-gray-800 rounded p-2"
              placeholder="Views"
            />
            <input
              type="datetime-local"
              value={new Date(newPost.timestamp).toISOString().slice(0, 16)}
              onChange={(e) => setNewPost({ ...newPost, timestamp: new Date(e.target.value).toISOString() })}
              className="bg-black text-white border border-gray-800 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200"
          >
            Post
          </button>
        </form>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="p-4 border border-gray-800 rounded-lg">
              <div className="flex items-start mb-2">
                <div className="w-12 h-12 bg-white rounded-md mr-3 flex-shrink-0"></div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <div className="font-bold mr-1">ye</div>
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center ml-1">
                      <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </div>
                    <div className="text-gray-500 ml-2">@kanyewest · 1h</div>
                  </div>
                  <p className="text-lg mt-1 mb-3 font-medium leading-tight">{post.text}</p>
                  <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/>
                      </svg>
                      <span>{post.retweets}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"/>
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
                      </svg>
                      <span>{post.views || '1.3M'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 border border-gray-800 rounded-lg text-center">
          <p className="text-xl mb-2">Remaining tweets today: <span className="font-bold">{remainingTweets}</span></p>
          <p className="text-gray-500">
            this website shows {DAILY_TWEET_LIMIT} tweets per day, and resets at midnight. screenshot the page to save it forever. anyone can post. there is no filter. built by ajm
          </p>
        </div>
      </main>
    </div>
  );
}
