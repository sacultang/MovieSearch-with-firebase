import { render, screen } from '@testing-library/react';
import WhatsPopular from '../WhatsPopular';
import { BrowserRouter } from 'react-router-dom';

test('rendering whatsPopular text', () => {
  render(
    <BrowserRouter>
      <WhatsPopular />
    </BrowserRouter>
  );

  const whatsPopular = screen.getByText(/WhatsPopular/i);

  expect(whatsPopular).toBeEnabled();
});
