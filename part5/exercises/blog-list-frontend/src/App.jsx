import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const url = formData.get('url');
    try {
      const blog = await blogService.add({ title, author, url });
      setBlogs(blogs.concat(blog));
      showInfoNotification(`A new blog ${blog.title} added`);
    } catch (exception) {
      console.log(exception);

      showErrorNotification('Error adding new blog');
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };
    return (
      <>
        <h2>Log in to application</h2>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <Login onLogin={handleLogin} />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </>
    );
  };

  return (
    <div>
      <Notification message={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
