import React, {useState} from 'react';
import '../../css/Room.css'
import gql from "graphql-tag";
import {useMutation} from '@apollo/client';


function MovieToDbHooksGql () {
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
            <h1>Add movie to db</h1>
            <form onSubmit={handleAddmovie}>
                <label>Add author</label><input onChange={(event) => setAuthor(event.target.value)} />
                <label>Add url</label><input onChange={(event) => setUrl(event.target.value)} />
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


export default MovieToDbHooksGql;
