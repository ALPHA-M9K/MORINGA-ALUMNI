import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const INITIAL_POSTS = [
  {
    id: 1,
    content: "This is the first post on the forum.",
    username: "johndoe",
    createdAt: "2024-03-15",
    upvotes: 5,
    downvotes: 1,
    comments: [
      {
        id: 1,
        content: "Great post!",
        username: "alice",
        createdAt: "2024-03-15",
      },
      {
        id: 2,
        content: "I totally agree with this.",
        username: "bob",
        createdAt: "2024-03-15",
      },
    ],
  },
  {
    id: 2,
    content: "How to get started with web development?",
    username: "webdev123",
    createdAt: "2024-03-14",
    upvotes: 8,
    downvotes: 2,
    comments: [
      {
        id: 1,
        content: "Start with HTML and CSS!",
        username: "carol",
        createdAt: "2024-03-14",
      },
      {
        id: 2,
        content: "JavaScript is also very important.",
        username: "dave",
        createdAt: "2024-03-14",
      },
    ],
  },
];

const INITIAL_SUCCESS_STORIES = [
  {
    id: 1,
    content:
      "I started learning to code 6 months ago, and now I have a job as a front-end developer!",
  },
  {
    id: 2,
    content:
      "After months of hard work, I successfully built my first full-stack application!",
  },
];

const Forum = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [successStories, setSuccessStories] = useState(INITIAL_SUCCESS_STORIES);
  const [newSuccessStory, setNewSuccessStory] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleVote = (postId, type) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
            downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const createPost = () => {
    const newPost = {
      id: posts.length + 1,
      content: newPostContent,
      username: "newUser",
      createdAt: new Date().toLocaleDateString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };
    setPosts([...posts, newPost]);
    setNewPostContent(""); 
  };

  const createComment = (postId) => {
    if (newComment.trim()) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  content: newComment,
                  username: "newCommenter",
                  createdAt: new Date().toLocaleDateString(),
                },
              ],
            }
          : post
      );
      setPosts(updatedPosts);
      setNewComment(""); 
    }
  };

  const createSuccessStory = () => {
    if (newSuccessStory.trim()) {
      const newStory = {
        id: successStories.length + 1,
        content: newSuccessStory,
      };
      setSuccessStories([...successStories, newStory]);
      setNewSuccessStory(""); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Create Post Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <textarea
          placeholder="Write your post here..."
          className="w-full p-2 border rounded mb-4 min-h-[100px]"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button
          onClick={createPost}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </div>

      {/* Success Stories Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Success Stories</h2>
        <textarea
          value={newSuccessStory}
          onChange={(e) => setNewSuccessStory(e.target.value)}
          placeholder="Share your success story..."
          className="w-full p-2 border rounded mb-4 min-h-[100px]"
        />
        <button
          onClick={createSuccessStory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Share Story
        </button>
        <div className="mt-4">
          {successStories.map((story) => (
            <div key={story.id} className="bg-gray-100 p-4 rounded mb-2">
              {story.content}
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{post.content}</h3>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleVote(post.id, "up")}
                className="text-green-600"
              >
                <ThumbsUp /> {post.upvotes}
              </button>
              <button
                onClick={() => handleVote(post.id, "down")}
                className="text-red-600"
              >
                <ThumbsDown /> {post.downvotes}
              </button>
              <div className="flex items-center gap-1 text-gray-600">
                <MessageSquare size={16} /> {post.comments.length}
              </div>
            </div>

            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">
                    Comment by {comment.username} on {comment.createdAt}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
              <textarea
                placeholder="Write your comment..."
                className="w-full p-3 border rounded-lg mb-3 min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={() => createComment(post.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
