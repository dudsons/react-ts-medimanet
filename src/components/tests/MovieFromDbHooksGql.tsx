import React, {useContext, useState} from 'react';
import '../../css/Room.css'
import gql from "graphql-tag";
import {useQuery} from '@apollo/client';

interface IMovie {
    id: number,
    author: string,
    url: string
}

interface IMovies {
    getMovies: IMovie[]
}

interface IMoviesVars {
    limit: number;
}

function MovieFromDbHooksGql() {
    const {error, loading, data} = useQuery<IMovies, IMoviesVars>(GET_MOVIES, {
            variables: {limit: 100},
            fetchPolicy: "network-only"
        }
    );

    const [movies, setMovies] = useState<any>();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error can not get movies</div>;


    function displayMoviesFilm() {
        let movies = data?.getMovies.map((data, idx) => {
            return (<li key={idx}>{data.id},{data.author},{data.url}</li>)
        });
        setMovies(movies);
    }


    return (
        <div>
            <div>
                <p>Graphql tests buttons</p>
            </div>
            <p>Films in DB:</p>
            <div>
                <button onClick={displayMoviesFilm}> Get movies list</button>
                <ul>
                    {movies}
                </ul>
            </div>
        </div>
    );
}


const GET_MOVIES = gql`
    query GetMovies($limit: Int!){
        getMovies(limit: $limit){
            id,
            author,
            url
        }
    }`;

export default MovieFromDbHooksGql;
