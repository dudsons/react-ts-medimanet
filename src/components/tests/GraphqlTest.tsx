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

     ADD_MOVIES = gql`
        mutation AddMovie($author: String!, $url:String){
            addMovie(author: $author, url: $url){
                author,
                url
            }
        }`;

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
        // const author2:string = (document.getElementById('author')as HTMLInputElement).value;
        // const url2:string = (document.getElementById('url')as HTMLInputElement).value;
        this.client.mutate({
            mutation: this.ADD_MOVIES,
            variables: {author:this.author2, url:this.url2},
        })
            .then((response) => console.log(response.data))
            .catch((err) => console.error(err));

    }
    // addMovieToDb() {
    //     // e.preventDefault();
    //     if(document.getElementById('author') != null ||
    //         document.getElementById('url') != null) {
    //         const author2:string = (document.getElementById('author')as HTMLInputElement).value;
    //         const url2:string = (document.getElementById('url')as HTMLInputElement).value;
    //         console.log(`author to save: `+ author2 + ' url: ' + url2);
    //     }
    //
    //     this.client
    //     .mutate({
    //     mutation: gql`
    //             mutation TestQuery2 {
    //                 addMovie(author:author2,url: url2){
    //                     id,
    //                     author
    //                 }
    //             }
    //         `
    //     })
    //
    //     .then(result => console.log(result));
    // }
    render() {
            return (
            <div>
                <div>
                    <p>Graphql tests buttons</p>
                    <button onClick={()=>this.getMoviesFromServer()}>Graphql Get movies</button>
                </div>
                <form>
                    <label>Add author</label><input type="text" id="author"/>
                    <label>Add url</label><input type="text" id="url"/>
                    <button onClick={()=>this.addMovieToDb2}>Add movie to db</button>
                </form>
                <p>Films in DB:</p>
                <div>{this.state.movies.map(function (d,idx){
                    return (<li key={idx}>{d.id},{d.author},{d.url}</li>)
                })}</div>
            </div>
        );
    }


}

