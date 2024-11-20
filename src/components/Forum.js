import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const INITIAL_POSTS = [
  {
    id: 1,
    content: "This is the first general post on the forum.",
    username: "johndoe",
    createdAt: "2024-03-15",
    upvotes: 5,
    downvotes: 1,
    type: "General",
    comments: [
      { id: 1, content: "Great post!", username: "alice", createdAt: "2024-03-15" },
      { id: 2, content: "I totally agree with this.", username: "bob", createdAt: "2024-03-15" },
    ],
  },
  {
    id: 2,
    content: "How to get started with web development?",
    username: "webdev123",
    createdAt: "2024-03-14",
    upvotes: 8,
    downvotes: 2,
    type: "Question",
    comments: [
      { id: 1, content: "Start with HTML and CSS!", username: "carol", createdAt: "2024-03-14" },
      { id: 2, content: "JavaScript is also very important.", username: "dave", createdAt: "2024-03-14" },
    ],
  },
];

const INITIAL_SUCCESS_STORIES = [
  { id: 1, content: "I started learning to code 6 months ago, and now I have a job as a front-end developer!" },
  { id: 2, content: "After months of hard work, I successfully built my first full-stack application!" },
];

const Forum = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  // const [successStories, setSuccessStories] = useState(INITIAL_SUCCESS_STORIES);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState("General");
  const [newComments, setNewComments] = useState({});
  const [sortBy, setSortBy] = useState("recent");

  // Handle Voting
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

  // Handle Post Creation
  const createPost = () => {
    if (!newPostContent.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    const newPost = {
      id: posts.length + 1,
      content: newPostContent,
      username: "newUser",
      createdAt: new Date().toLocaleDateString(),
      upvotes: 0,
      downvotes: 0,
      type: newPostType,  // Set post type
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostType("General"); // Reset the type to General
  };

  // Handle Comment Creation
  const createComment = (postId) => {
    const commentContent = newComments[postId]?.trim();
    if (!commentContent) {
      alert("Comment cannot be empty.");
      return;
    }
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                content: commentContent,
                username: "newCommenter",
                createdAt: new Date().toLocaleDateString(),
              },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
  };

  // Sort Posts by Type
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "upvotes") return b.upvotes - a.upvotes;
    if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "type") return a.type.localeCompare(b.type);  // Sort by type (General, Question, Success Story)
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Create Post Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 create-post-section">
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>
        <textarea
          placeholder="Write your post here..."
          className="w-full p-2 border rounded mb-4 min-h-[100px]"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <div className="mb-4">
          <label htmlFor="postType" className="block text-sm font-medium text-gray-700">Post Type</label>
          <select
            id="postType"
            value={newPostType}
            onChange={(e) => setNewPostType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="General">General</option>
            <option value="Question">Question</option>
            <option value="Success Story">Success Story</option>
          </select>
        </div>
        <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Post
        </button>
      </div>

      {/* Sort Posts Section */}
      <div className="mb-4 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="recent">Sort by: Recent</option>
          <option value="upvotes">Sort by: Upvotes</option>
          <option value="type">Sort by: Type</option>
        </select>
      </div>

      {/* Posts Section */}
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{post.content}</h3>
            <p className="text-gray-500 text-sm">Posted by {post.username} on {post.createdAt}</p>
            <p className="text-sm text-gray-500">Type: {post.type}</p>
            <div className="flex gap-4 my-4">
              <button onClick={() => handleVote(post.id, "up")} className="text-green-600 flex items-center gap-1">
                <ThumbsUp /> {post.upvotes}
              </button>
              <button onClick={() => handleVote(post.id, "down")} className="text-red-600 flex items-center gap-1">
                <ThumbsDown /> {post.downvotes}
              </button>
              <div className="flex items-center gap-1 text-gray-600">
                <MessageSquare size={16} /> {post.comments.length} comments
              </div>
            </div>
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">Comment by {comment.username} on {comment.createdAt}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Write your comment..."
                className="w-full p-2 border rounded mb-2"
                value={newComments[post.id] || ""}
                onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
              />
              <button onClick={() => createComment(post.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Post Comment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Success Stories</h2>
        <div className="mt-4">
          {successStories.map((story) => (
            <div key={story.id} className="bg-gray-100 p-4 rounded mb-2">
              {story.content}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Forum;

