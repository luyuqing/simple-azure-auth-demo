import axios from 'axios';
import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { tokenRequest } from '../authConfig';

import '../styles/App.css';

async function callApi(accessToken) {
    const apiUrl = 'https://localhost:7128/ToDo';
    // console.log(accessToken);

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
}

export const DisplayData = (props) => {
    const [showIdToken, setShowIdToken] = useState(false);
    const [showAccessToken, setShowAccessToken] = useState(false);
    const [showTodos, setShowTodos] = useState(false);
    const { instance, inProgress, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const accessTokenRequest = {
        scopes: tokenRequest.scopes,
        account: accounts[0],
        };
        if (!apiData && inProgress === InteractionStatus.None) {
        instance
            .acquireTokenSilent(accessTokenRequest)
            .then(async (accessTokenResponse) => {
            // Acquire access token silent success
            setAccessToken(accessTokenResponse.accessToken);
            // Call API with access token
            await callApi(accessTokenResponse.accessToken).then((response) => {
                setApiData(response);
            });
            })
            .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
                instance.acquireTokenRedirect(accessTokenRequest);
            }
            console.log(error);
            });
        }
    }, [instance, accounts, inProgress, apiData, accessToken]);

    return (
    <div>
    <table>
      <tbody>
        <tr className="todoRow">
          <td>IdToken:</td>
          <td>
            {showIdToken ? props.idToken : '***'}
            <button className="expandBtn" onClick={() => setShowIdToken(!showIdToken)}>
              {showIdToken ? 'Hide' : 'Expand'}
            </button>
          </td>
        </tr>
        <tr className="todoRow">
          <td>TodoApi AccessToken:</td>
          <td>
            {showAccessToken ? accessToken : '***'}
            <button className="expandBtn" onClick={() => setShowAccessToken(!showAccessToken)}>
              {showAccessToken ? 'Hide' : 'Expand'}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button className="showButton" onClick={() => setShowTodos(!showTodos)}>
        {showTodos ? 'Hide Todos' : 'Show Todos'}
      </button>
      
      {showTodos && (
        <table className="todoTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.task}</td>
                <td className="todoDescription">{todo.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};