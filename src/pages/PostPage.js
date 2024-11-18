import React from 'react';
import { useParams } from 'react-router-dom';
import Forum from '../components/Forum';

const PostPage = () => {
  const { id } = useParams();
  return <Forum singlePostId={id} />;
};

export default PostPage;