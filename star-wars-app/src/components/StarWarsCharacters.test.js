import React from 'react';
import {render, wait, fireEvent, getByText} from '@testing-library/react';
import {getData as mockGetData} from '../api';
import StarWarsCharacters from './StarWarsCharacters';
import '@testing-library/jest-dom'
import App from '../App'

jest.mock('../api');

// test('render names', async () => {
//     mockGetData.makeResolvedValueOnce([]);
    

// });

test('button', async () => {
    mockGetData.mockResolvedValueOnce({
        result: [
            {
                name: 'Owen Lars',
                height: '178',
                mass: '120',
                gender: 'male'

            }
        ],
        next: 'nextPage',
        previous: 'prevPage'
    }); 


    const {getByText} = render(<StarWarsCharacters />)

    const prevBtn = getByText(/previous/i);
    const nextBtn = getByText(/next/i)

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    expect(mockGetData).toHaveBeenCalledTimes(0);

    wait(() => expect(getByText(/Owen/i).toBeInDocument()))
})

test('render of logo', async () => {
    const wrapper = render(<App />)
    const logo = wrapper.getAllByAltText(/logo/i)

    expect(logo[0]).toBeVisible();
});
