import React from 'react';
import { connect } from 'react-redux';

class Options extends React.Component {
    
    constructor(props){
        super(props);
    }

    handleOptionClick(index){
        let {pagedata , questionPointer}= this.props;
        const optionind= this.props.questionPointer;

        const tempArr = pagedata[questionPointer].options.map((value,i) => {
            if(index === i){
                value.selected = true
            }
            else{
                value.selected = false
            }
            return value;
        });
        pagedata[optionind].options = tempArr;
        pagedata[optionind].submit = true;
        
        this.props.onSelect({
            pagedata
          });
    }

    render(){
        const {pagedata , questionPointer , classtoadd} = this.props;
        console.log(pagedata[questionPointer].options , "pagedata[qp]");
        const disableradio = (classtoadd === 'btn-disabled') ? true : false;
         
        const temp = pagedata[questionPointer].options.map((value,index) => {
           
            return (
                <div keys={index} style={{ display: 'table' }}>
                  <div style={{ display: 'table-cell'}}>
                  <input type='radio' checked={value.selected} onClick = {() => this.handleOptionClick(index)} disabled={disableradio}/>
                  </div>
                  <div style={{ display: 'table-cell'}}>
                    {value.name}
                  </div>
                </div>
              )
        });
        

        return(
            <div>
            {temp}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
      pagedata: state.datareducer,
      questionPointer: state.btnreducer.questionPointer,
      submit: state.btnreducer.submit
    };
  };

  const mapDispatchToprops = (dispatch) => {
    return {
      onSelect: (_obj) => {
        dispatch({
          type: 'ONSELECT',
          payload: _obj
        });
      },
  }
}

  export default connect(mapStateToProps, mapDispatchToprops)(Options);