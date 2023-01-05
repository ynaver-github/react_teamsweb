import AnalogClock from './components/AnalogClock';
import Alarm from './context/Alarm';
import AlarmOption from './components/AlarmOption';
import DigitalClock from './components/DigitalClock';
import './App.css';
import ProximitySensor, { onMouseMove } from './components/ProximitySensor';
import RickyMonty from './assets/rickymonty.png';
import Eye from './assets/eye.png';


function App() {
  return (
    <section className="clock container" onMouseMove={onMouseMove}>
          <ProximitySensor />
      <div className="clock-container grid">
        <div className="clock-content grid">
          <Alarm>
            <AnalogClock />
            <DigitalClock />
            <AlarmOption />
          </Alarm>
        </div>
      </div>
      <br></br>
      <div>
      {/* <ProximitySensor /> */}
      {/* <img src={RickyMonty} alt="Ricky and Monty" id="anchor" /> */}
      </div>
    </section>
  );
}

export default App;
