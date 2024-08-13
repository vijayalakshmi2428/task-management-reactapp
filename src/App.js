import logo from './logo.svg';
import './App.css';
import ProjectComponent from './Components/ProjectComponent';
import TaskComponent from './Components/TaskComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/project' element = {<ProjectComponent/>} />  
          <Route path='/task' element = {<TaskComponent/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
