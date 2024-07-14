import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import router from "./route";
import store from "./store/store";
import { Provider } from "react-redux";
import { getConfig } from "./config";
import { Auth0Provider } from "@auth0/auth0-react";


// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
        redirect_uri: window.location.origin + '/auth/callback',
        ...(config.audience ? { audience: config.audience } : null),
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <React.StrictMode>
            <Provider store={store}>
                {<Auth0Provider {...providerConfig}>
                    <RouterProvider router={router}/>
                </Auth0Provider>}
            </Provider>
        </React.StrictMode>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
