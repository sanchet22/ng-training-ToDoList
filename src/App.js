import './App.css';
import AllTasks from './Components/AllTasks';
import AddTask from './Components/AddTask';
import EditTask from './Components/EditTask';
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import to Routes

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/*" element={<AllTasks />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
