import React, {Component} from 'react';
import {Client} from '@stomp/stompjs';
import '../../css/Room.css'
import {
    ApolloClient,
    gql,
    useMutation,
    NormalizedCacheObject
} from '@apollo/client';
import {cache} from "../../cash";


export default class GraphqlTest extends Component <any, any> {

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
        .then(result => console.log(result));
    }

    render() {
        useQu
        return (
            <div>
                <div>
                    <p>Graphql tests buttons</p>
                    <button onClick={()=>this.getMoviesFromServer()}>Graphql Get movies</button>
                    <p ></p>
                </div>
            </div>
        );
    }
}

