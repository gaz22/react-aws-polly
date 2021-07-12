import "./App.css";
import SpeechForm from "./Polly/speech-form";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-primary">
        <div className="container">
          <a className="navbar-brand" style={{ color: "white"}} href="#">Text to speech</a>
        </div>
      </nav>
      <div className="container">
        <SpeechForm />
      </div>
    </div>
  );
}

export default App;
