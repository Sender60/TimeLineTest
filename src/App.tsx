import './App.scss';
import { Circle } from './components/Circle/Circle';
import { timelineData } from './data/mockTimeLineData';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__container-content">
          <h1 className="title">
            Исторические
            <br />
            даты
          </h1>
          <Circle timelineData={timelineData} />
        </div>
      </div>
    </div>
  );
}

export default App;
