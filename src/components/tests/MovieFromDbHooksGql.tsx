import React, {useState} from 'react';
import '../../css/Room.css'
import gql from "graphql-tag";
import {useQuery} from '@apollo/client';

interface IMovie {
    id:number,
    author:string,
    url:string
}

interface IMovies {
    getMovies:IMovie[]
}

interface IMoviesVars {
    limit:number;
}

function MovieFromDbHooksGql () {
    const {error, loading,data} = useQuery<IMovies,IMoviesVars>(GET_MOVIES,{
       variables : {limit:100}}
       );

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error can not get movies</div>
    return (
        <div>
            <div>
                <p>Graphql tests buttons</p>
            </div>
            <p>Films in DB:</p>
            <div>{data?.getMovies[0].author} </div>
        </div>
    );
}


const GET_MOVIES = gql`
    query GetMovies($limit: Int!){
        getMovies(limit: $limit){
            author
            url
        }
    }`;

export default MovieFromDbHooksGql;
