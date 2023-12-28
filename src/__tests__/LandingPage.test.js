import React from 'react';
import { render, screen } from '@testing-library/react';
import RenderLandingPage from '../components/pages/Landing/RenderLandingPage';

describe('render landing component', () => {
  test('Renders Landing Page with header and buttons', () => {
    render(<RenderLandingPage />);

    //check images on page
    const threeImages = screen.getAllByRole('img');
    expect(threeImages).toHaveLength(4);

    // Check if the header text is rendered
    const headerText = screen.getByText('Asylum Office Grant Rate Tracker');
    expect(headerText).toBeInTheDocument();

    // Check if buttons are rendered
    const viewDataButton = screen.getByText('View the Data');
    expect(viewDataButton).toBeInTheDocument();

    const downloadDataButton = screen.getByText('Download the Data');
    expect(downloadDataButton).toBeInTheDocument();
  });
});
