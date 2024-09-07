import { ToDo } from './pages/ToDo';
import { Weather } from './pages/Weather';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/weather" element={<Weather />} />
      <Route path="/todo" element={<ToDo />} />
    </Routes>
  );
}

export default App;
