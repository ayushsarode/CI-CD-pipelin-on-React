import '@testing-library/jest-dom';  // Adds custom Jest matchers like toBeInTheDocument
import { render, screen } from '@testing-library/react';
import React from 'react';

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

test('renders Hello, World!', () => {
  render(<HelloWorld />);
  const element = screen.getByText(/hello, world/i);
  expect(element).toBeInTheDocument();
});
