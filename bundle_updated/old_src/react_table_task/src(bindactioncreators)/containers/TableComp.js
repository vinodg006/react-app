import React from 'react';
import {Table} from '../components/Table'

export class TableComp extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
    console.log(props , "TbleComp")
  }

  handleTableClick(value , position , index){
      const tempArr = this.props.tableData.map((element, i) => {
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
      <Table tableData = {this.props.tableData} position = {this.props.position} getTableClick={(value ,position , index) => this.handleTableClick.bind(this , value , position , index)}/>
    </div>
    );
  }
}

