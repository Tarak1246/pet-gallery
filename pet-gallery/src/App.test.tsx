import { render, screen } from '@testing-library/react';
import { PetList } from './components/PetList';
import { AppProvider } from './context/AppContext';

test('renders pets', () => {
  const mockPets = [
    {
      title: 'Barky Spears',
      description: 'Woof! I did it again',
      url: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?format=tiny',
      created: 'Sat Nov 16 22:32:43 UTC 2024',
    },
  ];

  // Wrap PetList with AppProvider
  render(
    <AppProvider>
      <PetList pets={mockPets} />
    </AppProvider>
  );

  // Assertions to verify rendered content
  expect(screen.getByText('Barky Spears')).toBeInTheDocument();
  expect(screen.getByText('Woof! I did it again')).toBeInTheDocument();
});
