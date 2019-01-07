import React from 'react';
import { ONSELECT, SHIFTPROCESS, RENDERCOUNT } from '../actionTypes';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {TableComp} from './TableComp';
import {ButtonComp} from './ButtonComp';
import {Count} from './Count'
import * as TodoActionCreators from '../TodoActionCreators'

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props
    console.log(props , "constructor");
    this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)
    console.log(this.boundActionCreators , "this.boundActionCreators")
  }

  componentDidMount(){
    console.log("componentdidmount")
    let { dispatch } = this.props;
    let action = TodoActionCreators.renderCount({
      leftCount: this.props.leftRows.length,
      rightCount: this.props.rightRows.length
    });
    dispatch(action);
  }

  render() {

    return (
      <div>
        <TableComp tableData = {this.props.leftRows} position = "leftRows" {...this.boundActionCreators} />
        <TableComp tableData = {this.props.rightRows} position = "rightRows" {...this.boundActionCreators}  />
        <ButtonComp btnName = "Shift Right" id = {1}   leftRows = {this.props.leftRows} rightRows = {this.props.rightRows} {...this.boundActionCreators}  />
        <ButtonComp btnName = "Shift Left" id = {2}   leftRows = {this.props.leftRows} rightRows = {this.props.rightRows} {...this.boundActionCreators}   />
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

// const mapDispatchToprops = (dispatch) => {
//   return {
//     onSelect: (_obj) => {
//       dispatch({
//         type: ONSELECT,
//         payload: _obj
//       });
//     },
//     shiftProcess: (_obj) => {
//       console.log('shiftProcess', SHIFTPROCESS);
//       dispatch({
//         type: SHIFTPROCESS,
//         payload: _obj
//       });
//     },
//     renderCount: (_obj) => {
//       console.log('renderCount' , RENDERCOUNT);
//       dispatch({
//         type: RENDERCOUNT,
//         payload: _obj
//       });
//     }
//   }
// }

export default connect(mapStateToProps)(App);
