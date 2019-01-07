import React from 'react';
import TableComp from './TableComp';
import ButtonComp from './ButtonComp';
import Count from './Count'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TableComp />
        <ButtonComp />
        <Count />
      </div>
    )
  }
}

