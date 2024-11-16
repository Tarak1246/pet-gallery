import React from 'react';
import { PetList } from './components/PetList'; // Component to display the list of pets
import { useFetchPets } from './hooks/useFetchPets'; // Custom hook for fetching pets data
import { AppProvider } from './context/AppContext'; // Context provider for global state management
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'; // React Router for navigation
import './styles/GlobalStyles.css'; // Global CSS styles
import About from './components/About'; // About component for the "About Me" page

const App = () => {
  // Fetch pets data using the custom hook
  const { pets, loading, error } = useFetchPets('https://eulerity-hackathon.appspot.com/pets');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AppProvider>
      {/* Wrap the app with the global state provider */}
      <Router>
        {/* Header with Pet Gallery in the center */}
        <header className="header">
        <div className="nav-links">
            {/* NavLink automatically applies 'active' class when the route matches */}
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About Me
            </NavLink>
          </div>
          <div className="title">Pet Gallery</div>
        </header>
        {/* Main content area for displaying routed components */}
        <div className="main-content">
          <Routes>
            {/* Route for the Home page, displaying the list of pets */}
            <Route path="/" element={<PetList pets={pets} />} />
            {/* Route for the About Me page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
