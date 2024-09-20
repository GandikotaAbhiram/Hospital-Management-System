import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavHeader from './Components/NavHeader';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-success fs-2"> Hospital Management System </h1>
      <NavHeader/>
    </div>
  );
}

export default App;
