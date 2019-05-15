import MockAdapter from 'axios-mock-adapter'
// import login_response from '~/stub/authentication/login_response.json'
import company_response from '~/stub/authentication/company_response.json'
import companies_response from '~/stub/authentication/companies_response.json'
import jobs_response from '~/stub/authentication/jobs_response.json'

export default ({ $axios }) => {
  const mock = new MockAdapter($axios, { delayResponse: 500 })
    // console.log('login_response ' + JSON.stringify(login_response));
  // mock.onGet('/api/xx').reply(200, login_response)
  mock.onGet('/api/companies/1').reply(200, company_response)
  mock.onGet('/api/companies').reply(200, companies_response)
  mock.onGet('/api/jobs').reply(200, jobs_response)
}
