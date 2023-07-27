import React, { useState } from 'react';
import Post from '../../builders/Post/Post';
import './PostList.css';

const PostsList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;


  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;


  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section>
        <div>
          {currentPosts.map((post) => {
            return (
              <Post
                key={post._id}
                artist={post.artist}
                username={post.username}
                userId={post.authorId._id}
                title={post.title}
                postText={post.postText}
                songURL={post.songURL}
              />
            );
          })}
        </div>
      </section>

      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default PostsList;
