import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ChatDiscussionForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [successStories, setSuccessStories] = useState([]);
  const [newSuccessStory, setNewSuccessStory] = useState("");

  useEffect(() => {
    // Fetch initial posts and success stories from the server
    fetchPosts();
    fetchSuccessStories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchSuccessStories = async () => {
    try {
      const response = await fetch("/api/success-stories");
      const data = await response.json();
      setSuccessStories(data);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    }
  };

  const createPost = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPost }),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const createSuccessStory = async () => {
    try {
      const response = await fetch("/api/success-stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newSuccessStory }),
      });
      const data = await response.json();
      setSuccessStories([...successStories, data]);
      setNewSuccessStory("");
    } catch (error) {
      console.error("Error creating success story:", error);
    }
  };

  const createComment = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      // Update the post with the new comment
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post here..."
            className="mb-4"
          />
          <Button onClick={createPost}>Create Post</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newSuccessStory}
            onChange={(e) => setNewSuccessStory(e.target.value)}
            placeholder="Share your success story..."
            className="mb-4"
          />
          <Button onClick={createSuccessStory}>Share Story</Button>
          <div className="mt-4">
            {successStories.map((story) => (
              <div key={story.id} className="bg-gray-100 p-4 rounded mb-2">
                {story.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Discussion Forum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-4 rounded">
                <p>{post.content}</p>
                <div className="mt-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="mr-2"
                  />
                  <Button onClick={() => createComment(post.id)}>
                    Comment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatDiscussionForum;
