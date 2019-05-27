import MockAdapter from 'axios-mock-adapter'
import account_response from '~/stub/authentication/account_response.json'
import login_response from '~/stub/authentication/login_response.json'
import company_response from '~/stub/authentication/company_response.json'
import companies_response from '~/stub/authentication/companies_response.json'
import jobs_response from '~/stub/authentication/jobs_response.json'
import job_response from '~/stub/authentication/job_response.json'

export default ({ $axios }) => {
  const mock = new MockAdapter($axios, { delayResponse: 500 })
    // console.log('login_response ' + JSON.stringify(login_response));
  mock.onPost('/api/auth/login').reply(200, login_response)
  mock.onPost('/api/auth/user').reply(200, account_response)
  mock.onGet('/api/companies/1').reply(200, company_response)
  mock.onGet('/api/companies').reply(200, companies_response)
  mock.onGet('/api/jobs').reply(200, jobs_response)
  mock.onGet('/api/jobs/1').reply(200, job_response)
  // mock.onGet('/api/jobs/1?mode=all').reply(200, job_response)
}
