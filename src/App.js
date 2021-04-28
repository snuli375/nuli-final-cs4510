import logo from './logo.svg';
import './App.css';
import cats from './Cats'
import GameState from './GameState';

const buttons = (buttons) => {
  return <div>
    {buttons.map(b =>
      <button onClick={() => b.action}>{b.name}</button>
    )}
  </div>

}

function App() {
  const state = new GameState(cats.droop)
  return (
    <div className="App">
      <header className="App-header">
        {['Poke', 'Feed', 'Pet', 'Do nothing'].map(action => 
            <button key={action} onClick={() => { state.handleAction(action) }}>{action}</button>
        )}
      </header>
    </div>
  );
}

export default App;
