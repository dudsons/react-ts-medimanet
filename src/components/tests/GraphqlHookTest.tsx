import React, {useState} from 'react';
import '../../css/Room.css'
import gql from "graphql-tag";
import {useMutation} from '@apollo/client';
import GqlQueries from "../graphql/graphqlQueries/GqlQueries";



function GraphqlHookTest () {
    const [author, setAuthor] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [addMovie, {loading, error}]  = useMutation(GqlQueries.);

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

const ADD_MOVIES = gql`
    mutation AddMovie($author: String!, $url:String){
        addMovie(author: $author, url: $url){
            author,
            url
        }
    }`;


export default GraphqlHookTest;
