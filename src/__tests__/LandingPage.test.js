import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RenderLandingPage from '../components/pages/Landing/RenderLandingPage';

describe('Render landing component', () => {
  test('Renders Landing Page header', () => {
    render(<RenderLandingPage />);
    const headerText = screen.getByText('Asylum Office Grant Rate Tracker');
    expect(headerText).toBeInTheDocument();
  });
});

describe('Render landing component', () => {
  test('Scrolling to top resets scroll position', () => {
    render(<RenderLandingPage />);
    document.body.scrollTop = 100;
    document.documentElement.scrollTop = 100;
    const backToTopButton = screen.getByText('Back To Top ^');
    fireEvent.click(backToTopButton);

    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);
  });
});
