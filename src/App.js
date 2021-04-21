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

  console.log()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => { cats.droop.tick() }}></button>
      </header>
    </div>
  );
}

export default App;
