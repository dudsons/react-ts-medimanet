import React, {Component} from 'react';
import '../../css/Room.css'
import {
    ApolloClient,
    gql,
    NormalizedCacheObject
} from '@apollo/client';
import {cache} from "../../cash";
import './GraphqlHookTest';


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

    author2:string = "xxxx";
    url2:string = "yyyyy";

    addMovieToDb2(e:any){
        e.preventDefault();
        this.client.mutate({
            mutation: this.ADD_MOVIES,
            variables: {author:this.author2, url:this.url2},
        })
            .then((response) => console.log(response.data))
            .catch((err) => console.error(err));

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


    ADD_MOVIES = gql`
        mutation AddMovie($author: String!, $url:String){
            addMovie(author: $author, url: $url){
                author,
                url
            }
        }`;

}

