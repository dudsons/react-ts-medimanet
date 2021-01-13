import * as React from 'react';
import {useEffect, useState} from 'react';

interface INumbers {
    text:string,
    number:number,
    found: boolean,
    type:string
}

const NumbersApiFetchHook = () =>{
    const [number, setNumber] = useState<INumbers>();

    const getNumber = async () =>{
    let r = await fetch('http://numbersapi.com/random/year?json');
    let number2 = await r.json();
        console.log(number2);

        setNumber(number2);
    };

    useEffect(()=>{
       getNumber();
    },[]);

    // console.log(number2);
    return (
        <main className="container">
            <div>{number?.text}</div>
        </main>
    )

};

export default NumbersApiFetchHook;
