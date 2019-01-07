import React from 'react';

export class Count extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props , "COUNT");

    }

    render(){
        return(
            <div>
                <p>Left Table Row Count: {this.props.leftRowsCount}</p>
                <p>Right Table Row Count: {this.props.rightRowsCount}</p>
            </div>
        );
    }
}