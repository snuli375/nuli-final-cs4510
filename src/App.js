import logo from './logo.svg';
import './App.css';
import cats from './Cats'

const buttons = (buttons) => {
  return <div>
    {buttons.map(b =>
      <button onClick={() => b.action}>{b.name}</button>
    )}
  </div>

}

function App() {

  const droop = cats.droop;
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={() => { droop.getStats().annoyance++; droop.tick(); }}>Poke</button>
        <button onClick={() => { droop.getStats().hunger--; droop.tick(); }}>Feed</button>
        <button onClick={() => { droop.getStats().happiness++; droop.tick(); }}>Pet</button>

      </header>
    </div>
  );
}

export default App;
