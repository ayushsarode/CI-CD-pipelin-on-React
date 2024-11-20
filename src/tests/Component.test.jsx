import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure this is imported to enable toBeInTheDocument
import ApiPractice from '../ApiTest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // Import MockAdapter

test('filters anime list based on search input', async () => {
  const mock = new MockAdapter(axios); // Create mock instance
  const mockAnimes = [
    { mal_id: 1, title: 'Naruto', synopsis: 'Ninja adventures' },
    { mal_id: 2, title: 'One Piece', synopsis: 'Pirate adventures' },
  ];
  
  mock.onGet('https://api.jikan.moe/v4/anime').reply(200, { data: mockAnimes });

  render(<ApiPractice />);

  // Check that the anime list renders
  await waitFor(() => expect(screen.getByText('Naruto')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('One Piece')).toBeInTheDocument());

  // Simulate a search
  fireEvent.change(screen.getByPlaceholderText('Enter anime name'), {
    target: { value: 'Naruto' },
  });

  // Check if the filtered result appears
  await waitFor(() => expect(screen.getByText('Naruto')).toBeInTheDocument());
  expect(screen.queryByText('One Piece')).not.toBeInTheDocument(); // Verify One Piece is filtered out
});
