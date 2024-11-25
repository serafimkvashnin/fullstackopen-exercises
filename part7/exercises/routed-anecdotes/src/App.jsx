import { useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import CreateAnecdote from './components/CreateAnecdote';
import Anecdote from './components/Anecdote';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => setNotification(null), 5000);

      return () => clearTimeout(timeoutId);
    }
  });

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch('/anecdotes/:id');
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateAnecdote addNew={addNew} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
