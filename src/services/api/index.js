import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset';

const API_PORT_NO = process.env.REACT_APP_API_PORT_NO;
const REST_API_BASE_PATH = process.env.REACT_APP_REST_API_BASE_PATH;
const { hostname, protocol } = window.location;
const REACT_APP_GRAPHQL_API_BASE_PATH = 
  process.env.REACT_APP_GRAPHQL_API_BASE_PATH;
const API_URL = `${protocol}//${hostname}:${API_PORT_NO}`;

const generateCorrelationId = () => {
  return "1234";
};

/**
 * Checking response status. In case of failed response code throw error back
 * @method checkStatus
 * @param {Array / Object} service response
 * @return {Array / Object} response data
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status<300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * Parsing the service response. Do it only if required
 * @method parseJSON
 * @param {Array / Object} service response 
 * @return {Array / Object} Valid JSON
 */
const parseJSON = (response) => response.json();

/**
 * Check if received response has any error.
 * If it has any error in the response throw error back
 */
const checkForError = (data) => {
  if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
    return data;
  }

  const error = new Error(data.error[0].message);
  throw error;
};

/**
 * Function to add mandatory headers before routing the request.
 * correlationId is added in the header so that the request can be tracked across layers. 
 */
const addMandatoryHeaders = (headers) => {
  headers.append('content-type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('correlationId', generateCorrelationId());
};

// Make server call using fetch
const fetchData = (apiURL, httpVerb, headers, requestPayLoad) => {
  const requestHeaders = new Headers();

  // Add the mandatory headers here
  addMandatoryHeaders(requestHeaders);

  // Add the custom headers
  Object.keys(headers).forEach((key) => {
    requestHeaders.append(key, headers[key]);
  });
  console.log('apiURL ='+apiURL);
  console.log('httpVerb ='+httpVerb);
  console.log('requestPayLoad ='+JSON.stringify(requestPayLoad));
  const responseText = fetch(apiURL, {
    //method: httpVerb,
    headers:requestHeaders
    //body: JSON.stringify(requestPayLoad)
  })
    .then((response) => checkStatus(response))
    .then((response) => parseJSON(response))
    .then((data) => checkForError(data))
    .then((data) => data)
    // eslint-disable-next-line
    .catch((error) => {
      throw error;
    });

    return responseText;
};


/**
 * Function used by all the actions in container components to make API Call
 * Function to make a synchronous call using Async/await
 */
export const serviceConnector = async (
  apiName,
  httpVerb,
  headers,
  requestPayLoad
) => {
  const apiURL = `${API_URL}${REST_API_BASE_PATH}${apiName}`;
  const data = await fetchData(apiURL, httpVerb, headers, requestPayLoad);
  const jsonResult = await data;
  return jsonResult;
};

/**
 * Function used by all the actions in container components to make GraphQL Call
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}${REACT_APP_GRAPHQL_API_BASE_PATH}`,
    headers: {
      correlationId: generateCorrelationId()
    }
  }),
  cache: new InMemoryCache()
});