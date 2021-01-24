import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, createHttpLink, NormalizedCacheObject, ApolloProvider, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
        uri: "http://localhost:8080/graphql"
    }
);

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJlazEiLCJpYXQiOjE2MTE0OTM0MjksImV4cCI6MTYxMTU3OTgyOX0.WmKK-fnt76OTN7nW8eDjcivd2Gni_A4XGbiRFywWr_uGqcGillZGq6gVKaXnMJcJ7DaHht-nbrDLqqbiWyvSoA"
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        resultCaching: false,
        addTypename: false
    }),
    // uri: 'http://localhost:8080/graphql'
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
