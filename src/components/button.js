import React from 'react';

export const Button = (props) => {
        const disablebtn = (props.classtoadd === 'btn-disabled') ? true : false;
        return(
            <button onClick = {props.getBtnClick} disabled = {disablebtn}>{props.name}</button> 
        );
}