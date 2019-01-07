import React from 'react';
import { RENDERCOUNT } from '../actionTypes';
import { connect } from 'react-redux';

class Count extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.renderCount({
            leftCount: this.props.leftRows.length,
            rightCount: this.props.rightRows.length
          });
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

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
      leftRowsCount: state.countreducer.leftCount,
      rightRowsCount: state.countreducer.rightCount,
      leftRows: state.datareducer.leftRows,
      rightRows: state.datareducer.rightRows
    };
  };
  
  const mapDispatchToprops = (dispatch) => {
    return {
        renderCount: (_obj) => {
            console.log('renderCount' , RENDERCOUNT);
            dispatch({
              type: RENDERCOUNT,
              payload: _obj
            });
          }
    }
  }
  
  export default connect(mapStateToProps , mapDispatchToprops)(Count);