import React from 'react';
import { connect } from 'react-redux';
import { Question } from '../components/question'
import Options from './options'
import ButtonContainer from './buttoncontainer'
import { Score } from '../components/score'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { questionPointer , pagedata } = this.props;

    const question = <Question question={pagedata[questionPointer].question} />

    const options = (pagedata[questionPointer].attempted) ?
      <Options classtoadd='btn-disabled' /> :
      <Options classtoadd='btn-enabled' />

    const prevBtn = (questionPointer === 0) ? 
      <ButtonContainer name="Previous" classtoadd='btn-disabled' /> : 
      <ButtonContainer name="Previous" classtoadd='btn-enabled' />

    const submitBtn = (pagedata[questionPointer].submit) ? 
      <ButtonContainer name="Submit" classtoadd='btn-enabled' /> : 
      <ButtonContainer name="Submit" classtoadd='btn-disabled' />

    const nextBtn = (pagedata[questionPointer].attempted && questionPointer !== pagedata.length - 1) ? 
      <ButtonContainer name="Next" classtoadd='btn-enabled' /> : 
      <ButtonContainer name="Next" classtoadd='btn-disabled' />

    return (
      <div>
        <Score attempts={this.props.attempts} />
        {question}
        {options}
        {prevBtn}
        {submitBtn}
        {nextBtn}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionPointer: state.btnreducer.questionPointer,
    pagedata: state.datareducer,
    attempts: state.btnreducer.attempts
  };
};

export default connect(mapStateToProps)(App);
