import React from 'react';
import {Button} from '../components/Button'

export class ButtonComp extends React.Component {
  constructor(props){
    super(props);
    console.log(props);

  }

  handleClick(){
    console.log(this);
    const selectArr = [];
    const tempArr1 = this.props.rightRows;
    const tempArr2 = this.props.leftRows;
    if(this.props.id === 1){

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
      <Button data={this.props.btnName} getBtnClick= {this.handleClick.bind(this)}/>
    </div>
    );
  }
}
