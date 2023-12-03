import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import NavigationBar from "./components/NavigationBar";
import TrainingCalendar from "./components/TrainingCalendar";
import StatisticsPage from "./components/StatisticsPage";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/trainingscalendar" element={<TrainingCalendar />} />
        <Route path="/statisticspage" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
