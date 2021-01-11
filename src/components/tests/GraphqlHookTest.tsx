import React, {useState} from 'react';
import '../../css/Room.css'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {InMemoryCache, useMutation} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
});

const ADD_MOVIES = gql`
    mutation AddMovie($author: String!, $url:String){
        addMovie(author: $author, url: $url){
            author,
            url
        }
    }`;

function GraphqlHookTest () {
    const [author, setAuthor] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [addMovie, {loading, error}]  = useMutation(ADD_MOVIES);

    function handleAddmovie(event:any) {
        event.preventDefault();
        addMovie({variables:{author, url}});
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;

    return (
        <div>
            <h1>New Post</h1>
            <form onSubmit={handleAddmovie}>
                <input onChange={(event) => setAuthor(event.target.value)} />
                <textarea onChange={(event) => setUrl(event.target.value)} />
                <button disabled={loading} type="submit">
                    Submit
                </button>
                {error && <p>{}</p>}
            </form>
        </div>
    );
}

export default GraphqlHookTest;
