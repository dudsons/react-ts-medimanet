import React, {Component} from 'react';
import '../../css/Room.css'
import {
    ApolloClient,
    gql,
    NormalizedCacheObject
} from '@apollo/client';
import {cache} from "../../cash";
import MovieFromDbHooksGql from "../../App_old";


interface IProps {
}

interface Movie {
    id:number,
    author:string,
    url:string
}

interface Movies {
    movies:Movie[]
}


export default class GraphqlTest extends Component <IProps, Movies> {

    constructor(props:IProps){
        super(props);
        this.state = {
            movies: []
        }
    }

    client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        cache,
        uri: 'http://localhost:9000/graphql'
    });

    ADD_MOVIES = gql`
        mutation AddMovie($author: String!, $url:String){
            addMovie(author: $author, url: $url){
                author,
                url
            }
        }`;

    getMoviesFromServer() {
        this.client
        .query({
            query: gql`
                query TestQuery {
                    getMovies(limit:100){
                        id,
                        author,
                        url,
                    }
                }
            `
        })
        .then(result => { console.log(result);
            this.setState({
                movies:result.data.getMovies
            })
        });
    }


    render() {
            return (
            <div>
                <div>
                    <p>Graphql tests buttons</p>
                    <button onClick={()=>this.getMoviesFromServer()}>Graphql Get movies</button>
                </div>
                <p>Films in DB:</p>
                <div>{this.state.movies.map(function (d,idx){
                    return (<li key={idx}>{d.id},{d.author},{d.url}</li>)
                })}</div>
            </div>
        );
    }




}

