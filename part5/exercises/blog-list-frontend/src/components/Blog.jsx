import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ user, blog, onLike, onRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

  const style = {
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5
  };

  return (
    <div style={style}>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsVisible}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </p>
      {detailsVisible && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button onClick={() => onLike(blog)}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <p>
              <button onClick={() => onRemove(blog)}>Remove</button>
            </p>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Blog;
