import React from 'react';
import {render, wait, fireEvent} from '@testing-library/react';
import {getData as mockGetData} from '../api';
import StarWarsCharacters from './StarWarsCharacters';
import '@testing-library/jest-dom'
import App from '../App';


jest.mock('../api/');


test('button', async () => {
    mockGetData.mockResolvedValueOnce({
        results: [
            {
                name: 'Owen Lars',
                height: '178',
                mass: '120',
                gender: 'male'

            }
        ],
        next: 'next url',
        previous: 'prev url'
    }); 


    const {getByText} = render(<StarWarsCharacters />);

    const prevBtn = getByText(/previous/i);
    const nextBtn = getByText(/next/i);

    fireEvent.click(nextBtn)

    fireEvent.click(prevBtn) 
    

    expect(mockGetData).toBeTruthy();

    await wait(() => expect(getByText(/Owen/i)))
})

test('render of logo', async () => {
    const wrapper = render(<App />)
    const logo = wrapper.getAllByAltText(/logo/i)

    expect(logo[0]).toBeVisible();
});