import React from 'react';

export const Score = (props) => {
        let count=0;
        let rightattempts = props.attempts.forEach((value) => {
            if(value)
                count++;
        })
        let scoreCalc = ((count)/(props.attempts.length))*100
        let score = (props.attempts.length) ? <p>Result: {scoreCalc}%</p> : <p>Result: NA</p>
        return(
            <div style= {{float: 'right'}}>
            <p>Attempts: {props.attempts.length}</p>
            <p>Right Answered: {count}</p>
            <p>Wrong Answered: {props.attempts.length - count}</p>
            {score}
            </div>
        );
}