import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogToggleRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const showInfoNotification = (text, duration = 5000) =>
    showNotification(text, 'info', duration);

  const showErrorNotification = (text, duration = 5000) =>
    showNotification(text, 'error', duration);

  const showNotification = (text, state, duration) => {
    setNotification({ text, state });
    clearTimeout();
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (exception) {
      showErrorNotification('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken('');
    window.localStorage.removeItem('user');
  };

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.add({ title, author, url });
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      blogToggleRef.current.toggleVisibility();
      showInfoNotification(`A new blog ${blog.title} added`);
    } catch (exception) {
      showErrorNotification('Error adding new blog');
    }
  };

  const handleLikeBlog = async (blog) => {
    try {
      const editedBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      };
      const updatedBlog = await blogService.update(editedBlog);
      setBlogs(
        blogs.map((b) =>
          b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b
        )
      );
    } catch (exception) {
      showErrorNotification('Error liking the blog');
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.user.name}`)) {
      try {
        await blogService.remove(blog);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        showErrorNotification('Error deleting the blog');
      }
    }
  };

  const getBlogsSortedByLikesDesc = () =>
    [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification message={notification} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Togglable buttonLabel="Login">
            <LoginForm onLogin={handleLogin} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="Add blog" ref={blogToggleRef}>
            <BlogForm onAddBlog={handleAddBlog} />
          </Togglable>
          {getBlogsSortedByLikesDesc().map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              onLike={handleLikeBlog}
              onRemove={handleRemoveBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
