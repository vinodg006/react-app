import React from 'react';
import { SHIFTPROCESS, RENDERCOUNT } from '../actionTypes';
import { connect } from 'react-redux';
import {Button} from '../components/Button'

class ButtonComp extends React.Component {
  constructor(props){
    super(props);
    console.log(props);

  }

  handleClick(position){
    console.log(this);
    const selectArr = [];
    const tempArr1 = this.props.rightRows;
    const tempArr2 = this.props.leftRows;
    if(position === "Shift Right"){

      this.props.leftRows.map((value, index) =>{
          if(value.selected === true){
            value.selected = false;
            tempArr1.push(value);
          }
          else{
            selectArr.push(value)
          }
      });
      this.props.shiftProcess({
        leftRows: selectArr,
        rightRows: tempArr1
      })
      this.props.renderCount({
        leftCount: selectArr.length,
        rightCount: tempArr1.length
      })
    }

    else{
      this.props.rightRows.map((value, index) =>{
          if(value.selected === true){
            value.selected = false;
            tempArr2.push(value);
          }
          else{
            selectArr.push(value)
          }
      });
      this.props.shiftProcess({
        leftRows: tempArr2,
        rightRows:selectArr
      });
      this.props.renderCount({
        leftCount: tempArr2.length,
        rightCount: selectArr.length
      })
    }
  }
  render(){
    return(
    <div>
      <Button data='Shift Right' getBtnClick= {this.handleClick.bind(this , 'Shift Right')}/>
      <Button data='Shift Left' getBtnClick= {this.handleClick.bind(this, 'Shift Left')}/>
    </div>
    );
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

export default connect(mapStateToProps, mapDispatchToprops)(ButtonComp);
