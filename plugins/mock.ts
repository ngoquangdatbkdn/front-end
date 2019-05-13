import MockAdapter from 'axios-mock-adapter';
import LoginResponse from '~/stub/authentication/login_response';

export default ({ $axios }) => {
    const mock = new MockAdapter($axios, { delayResponse: 500 });
    mock.onPost('/api/auth/login').reply(200, LoginResponse);
};
