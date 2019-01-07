import React from 'react';

export const Button = (props) => {
// onClick = {props.getBtnClick}
  return (
    <div>
    <button onClick = {props.getBtnClick}>{props.data}</button>
    </div>
  )
}
