import Login from '../components/Login';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';

const authMock = nock('http://localhost')
    .post('/v1/auth/login', {
        "email": "admin@test.com",
        "password": "password123"
    })
    .reply(200);

describe('Login component', () => {

    it('renders correctly', () => {
        const { asFragment } = render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('sends a login request correctly', async () => {
        const { getByTestId } = render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        fireEvent.change(getByTestId(/email/), { target: { value: 'admin@test.com' } });
        fireEvent.change(getByTestId(/password/), { target: { value: 'password123' } });
        await fireEvent.click(getByTestId("sign-in"));

        await waitFor(() => expect(authMock.isDone()).toBeTruthy());
    });

});