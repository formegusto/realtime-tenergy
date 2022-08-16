import ControlContainer from "@containers/ControlContainer";
import NowControlContainer from "@containers/NowControlContainer";
import ReadContainer from "@containers/ReadContainer";

function App() {
  return (
    <>
      <ReadContainer />
      <NowControlContainer />
      <ControlContainer />
    </>
  );
}

export default App;
