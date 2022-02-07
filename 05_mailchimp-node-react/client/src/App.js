import './App.css';
import AddMember from './components/AddMember';
import Audiance from './components/Audiance';


function App() {
  console.log("working");
  return (
    <div className="App">
      <div className="wrapper">
        <AddMember />
        <Audiance />
      </div>
    </div>
  );
}

export default App;
