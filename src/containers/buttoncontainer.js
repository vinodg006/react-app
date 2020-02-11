import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../components/button'

class ButtonContainer extends React.Component {
    
    constructor(props){
        super(props);
    }

    handleBtnClick(){
        const {props} = this;
        const pagedata= props.pagedata;
        const optionind= props.questionPointer;

        switch(props.name){
            case 'Submit': {
                console.log("SUBMIT");
                let tempArr = props.attempts;
                const correctindex = pagedata[optionind].answerkey;
                let correct = true;

                pagedata[optionind].attempted = true;
                pagedata[optionind].submit = false;

                pagedata[optionind].options.forEach((value,index) => {
                    if(value.selected && index === correctindex){
                        correct = false;
                        tempArr.push(true);
                    }
                });

                if(correct){
                    tempArr.push(false);
                }

                props.onSubmit({
                    attempts: tempArr
                });

                props.onSelect({
                    pagedata
                })
            }
            break;

            case 'Next': {
                console.log("Next");
                const update = optionind + 1;
                props.onNext({
                    questionPointer: update
                });
            }
            break;

            case 'Previous': {
                console.log("Previous");
                const update = optionind - 1;
                props.onPrevious({
                    questionPointer: update
                });
            }
            break;
        }
    }

    render(){    
        return(
                <Button name= {this.props.name} 
                        getBtnClick= {this.handleBtnClick.bind(this)} 
                        classtoadd= {this.props.classtoadd}
                />
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
      pagedata: state.datareducer,
      questionPointer: state.btnreducer.questionPointer,
      attempts: state.btnreducer.attempts,
      submit: state.btnreducer.submit
    };
  };

  const mapDispatchToprops = (dispatch) => {
    return {
      onSubmit: (_obj) => {
        dispatch({
          type: 'ONSUBMIT',
          payload: _obj
        });
      },
      onNext: (_obj) => {
        dispatch({
          type: 'ONNEXT',
          payload: _obj
        });
      },
      onPrevious: (_obj) => {
        dispatch({
          type: 'ONPREVIOUS',
          payload: _obj
        });
      },
      onSelect: (_obj) => {
        dispatch({
          type: 'ONSELECT',
          payload: _obj
        });
      }
  }
}

  export default connect(mapStateToProps, mapDispatchToprops)(ButtonContainer);