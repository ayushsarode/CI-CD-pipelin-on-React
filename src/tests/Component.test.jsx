import { render, screen } from '@testing-library/react';
import React from 'react';

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

test('renders Hello, World!', () => {
  render(<HelloWorld />);
  expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
});
