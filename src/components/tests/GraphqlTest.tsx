import React, {Component} from 'react';
import {Client} from '@stomp/stompjs';
import '../../css/Room.css'
import {
    ApolloClient,
    gql,
    NormalizedCacheObject
} from '@apollo/client';
import {cache} from "../../cash";
import './GraphqlHookTest';

interface Movie {
    id:number,
    author:string,
    url:string
}

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
        uri: 'http://localhost:8080/graphql'
    });


    getMoviesFromServer() {
        this.client
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
                <p>Message from server </p>
                <div>{this.state.movies.map(function (d,idx){
                    return (<li key={idx}>{d.id},{d.author}</li>)
                })}</div>
            </div>
        );
    }
}

