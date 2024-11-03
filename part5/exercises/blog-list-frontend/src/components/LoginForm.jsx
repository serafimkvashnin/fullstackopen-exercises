import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    onLogin({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
