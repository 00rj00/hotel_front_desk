import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />        
      </Router>
    </div>
  );
}

export default App;
