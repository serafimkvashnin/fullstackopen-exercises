import { useNavigate } from 'react-router-dom';
import { useField } from '../index';

const CreateAnecdote = (props) => {
  const contentField = useField('text');
  const authorField = useField('text');
  const infoField = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content: contentField.input.value,
      author: authorField.input.value,
      info: infoField.input.value,
      votes: 0
    };
    props.addNew(anecdote);
    navigate('/');
  };

  const handleReset = () => {
    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentField.input} />
        </div>
        <div>
          author
          <input name="author" {...authorField.input} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoField.input} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateAnecdote;
