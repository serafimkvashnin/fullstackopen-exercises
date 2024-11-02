import PropTypes from 'prop-types';

const BlogForm = ({ onAddBlog }) => {
  const handleAddBlog = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const url = formData.get('url');
    onAddBlog({ title, author, url });
  };

  return (
    <form onSubmit={handleAddBlog}>
      <label>
        Title
        <input type="text" name="title" />
      </label>
      <label>
        Author
        <input type="text" name="author" />
      </label>
      <label>
        Url
        <input type="text" name="url" />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired
};

export default BlogForm;
