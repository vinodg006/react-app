import React from 'react';
import { ONSELECT } from '../actionTypes';
import { connect } from 'react-redux';
import {Table} from '../components/Table';

class TableComp extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props , "TABLECOMP")
  }

  handleTableClick(value , position , index){
      let mapArr;
      if(position === 'leftRows'){
        mapArr = this.props.leftRows
      }
      else{
        mapArr = this.props.rightRows
      }
      const tempArr = mapArr.map((element, i) => {
        if (index === i) {
          element.selected = value
        }
        return element;
      });
      this.props.onSelect({
        [position]: tempArr,
        position
      });

     
  }

  render(){

    return(
    <div>
      <Table tableData = {this.props.leftRows} position = "leftRows" getTableClick={(value ,position , index) => this.handleTableClick.bind(this , value , position , index)}/>
      <Table tableData = {this.props.rightRows} position = "rightRows" getTableClick={(value ,position , index) => this.handleTableClick.bind(this , value , position , index)}/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return {
    leftRows: state.datareducer.leftRows,
    rightRows: state.datareducer.rightRows
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    onSelect: (_obj) => {
      dispatch({
        type: ONSELECT,
        payload: _obj
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(TableComp);
