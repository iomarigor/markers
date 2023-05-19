
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {Config} from './Config';
import {Storage} from './Storage';
import {Home} from './Home';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
                 <Route exact path='/' element={<Home/>}></Route>
                 <Route exact path='/about' element={<Storage/>}></Route>
                 <Route exact path='/config' element={<Config/>}></Route>
                 <Route exact path='*' element={<Home/>}></Route>
          </Routes>
      </div>
    </Router>
    
  );
}

export default App;
