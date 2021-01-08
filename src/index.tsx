import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    ApolloClient,
    gql,
    useMutation,
    NormalizedCacheObject
} from '@apollo/client';
import {cache} from "./cash";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:8080/graphql'
});

// ...ApolloClient instantiated here...

client
.mutate({
    mutation: gql`
        mutation TestQuery {
            addMovie(author:"Mrco",url: "io.pl"){
                id,
                author
            }
        }
    `
})

.then(result => console.log(result));


client
.query({
    query: gql`
        query TestQuery {
            getMovies(limit:10){
                id,
                author
            }
        }
    `
})

.then(result => console.log(result));

const randomQuotes: string[] = [
    "Before you judge a man, walk a mile in his shoes. After that who cares?... He’s a mile away and you’ve got his shoes!",
    "Better to remain silent and be thought a fool than to speak out and remove all doubt.",
    "The best thing about the future is that it comes one day at a time.",
    "The only mystery in life is why the kamikaze pilots wore helmets.",
    "Light travels faster than sound. This is why some people appear bright until you hear them speak.",
    "The difference between stupidity and genius is that genius has its limits"
]

ReactDOM.render(
    <React.StrictMode>
        <App/>
        {/*<QuoteApp quotes={randomQuotes}/>*/}

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
