import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Pet } from '../hooks/useFetchPets';
import '../styles/GlobalStyles.css';
// Component to display the list of pets
export const PetList = ({ pets }: { pets: Pet[] }) => {
  const { state, dispatch } = useAppContext();// Access global state and dispatch from context

  // State for managing sort column and order
  const [sortKey, setSortKey] = useState<'title' | 'description' | 'created'>('title'); // Default sort by 'title'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default order is 'asc'

  // State for managing the search input
  const [searchTerm, setSearchTerm] = useState('');

  // Function to check if a specific pet is selected
  const isSelected = (url: string) => state.selectedPets.includes(url);
  // Function to toggle selection for a specific pet
  const toggleSelect = (url: string) => {
    if (isSelected(url)) {
      dispatch({ type: 'DESELECT_PET', payload: [url] });// Deselect the pet if already selected
    } else {
      dispatch({ type: 'SELECT_PET', payload: [url] });// Select the pet if not selected
    }
  };
  // Function to select or deselect all pets
  const selectAll = () => {
    if (state.selectedPets.length === filteredPets.length) {
      dispatch({ type: 'CLEAR_SELECTION' });// Clear all selections if all pets are already selected
    } else {
      dispatch({ type: 'SELECT_ALL', payload: filteredPets.map((pet) => pet.url) });// Select all pets
    }
  };
  // Function to download selected pet images
  const downloadSelected = async () => {
    state.selectedPets.forEach(async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        // Extract file name without query parameters
        const fileName = url.split('/').pop()?.split('?')[0] || 'image.jpg';

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error downloading the image:', error);
      }
    });
  };
  // Function to handle sorting based on a column
  const handleSort = (key: 'title' | 'description') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');// Toggle sort order if the same column is clicked again
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  // Filter and sort pets based on search term and sort criteria
  const filteredPets = pets
    .filter(
      (pet) =>
        pet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

  return (
    <div>
    {/* Search bar to filter pets by title or description */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Button to download selected pet images */}
      <button
        onClick={downloadSelected}
        disabled={state.selectedPets.length === 0}
        style={{ marginBottom: '20px' }}
      >
        Download Selected
      </button>
      {/* Table to display pet details */}
      <table>
        <thead>
          <tr>
            <th>
                {/* Checkbox to select/deselect all pets */}
              <input
                type="checkbox"
                disabled={filteredPets.length === 0} // Disable if no pets
                checked={state.selectedPets.length === filteredPets.length}
                onChange={selectAll}
              />
              {/* Dynamic label for Select All / Deselect All */}
              {state.selectedPets.length === filteredPets.length
                ? 'Deselect All'
                : 'Select All'}
            </th>
            {/* Sortable table headers */}
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th>Created Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {/* Render rows for each pet */}
          {filteredPets.map((pet) => (
            <tr key={pet.url}>
              <td>
                {/* Checkbox for selecting/deselecting individual pets */}
                <input
                  type="checkbox"
                  checked={isSelected(pet.url)}
                  onChange={() => toggleSelect(pet.url)}
                />
              </td>
              <td>{pet.title}</td>
              <td>{pet.description}</td>
              <td>{new Date(pet.created).toLocaleString()}</td>
              <td>
                {/* Button to view pet image in a new tab */}
                <button onClick={() => window.open(pet.url, '_blank')}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
