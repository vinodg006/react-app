import React from 'react';
import { ONSELECT, SHIFTPROCESS, RENDERCOUNT } from '../actionTypes';
import { connect } from 'react-redux';
import {TableComp} from './TableComp';
import {ButtonComp} from './ButtonComp';
import {Count} from './Count'

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props , "constructor");
  }

  componentDidMount(){
    console.log("componentdidmount")
    this.props.renderCount({
      leftCount: this.props.leftRows.length,
      rightCount: this.props.rightRows.length
    })
  }

  render() {

    return (
      <div>
        <TableComp tableData = {this.props.leftRows} position = "leftRows" onSelect= {this.props.onSelect} />
        <TableComp tableData = {this.props.rightRows} position = "rightRows" onSelect= {this.props.onSelect} />
        <ButtonComp btnName = "Shift Right" id = {1} shiftProcess = {this.props.shiftProcess} leftRows = {this.props.leftRows} rightRows = {this.props.rightRows} renderCount = {this.props.renderCount} />
        <ButtonComp btnName = "Shift Left" id = {2} shiftProcess = {this.props.shiftProcess} leftRows = {this.props.leftRows} rightRows = {this.props.rightRows} renderCount = {this.props.renderCount}  />
        <Count leftRowsCount = {this.props.leftRowsCount} rightRowsCount = {this.props.rightRowsCount} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return {
    leftRows: state.datareducer.leftRows,
    rightRows: state.datareducer.rightRows,
    leftRowsCount: state.countreducer.leftCount,
    rightRowsCount: state.countreducer.rightCount
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    onSelect: (_obj) => {
      dispatch({
        type: ONSELECT,
        payload: _obj
      });
    },
    shiftProcess: (_obj) => {
      console.log('shiftProcess', SHIFTPROCESS);
      dispatch({
        type: SHIFTPROCESS,
        payload: _obj
      });
    },
    renderCount: (_obj) => {
      console.log('renderCount' , RENDERCOUNT);
      dispatch({
        type: RENDERCOUNT,
        payload: _obj
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);
