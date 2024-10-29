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
      <div>
        Title
        <input type="text" name="title" />
      </div>
      <div>
        Author
        <input type="text" name="author" />
      </div>
      <div>
        Url
        <input type="text" name="url" />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired
};

export default BlogForm;
