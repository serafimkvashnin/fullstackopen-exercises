const App = ({ store }) => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
};

export default App;
