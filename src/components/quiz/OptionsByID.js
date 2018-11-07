import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class OptionsByID extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Options: []
    };
  }

  componentDidMount() {
    let quizProps = { "id": this.props.options_id, "token": localStorage.getItem('token') };
    this.props.getOptionsByID(quizProps, (data) => {
      this.setState({
        Options: data
      });
    });

  }

  render() {
    return (
      <div>
      {this.state.Options.map((option, i) => {
         return (
          <div key={i}>
            <input type="radio" name={`q${option.itemId}`} id={`q${option.itemId}_o${option.id}`} value={`q${option.itemId}_o${option.id}`} disabled={this.props.disabled} /> <label htmlFor={`q${option.itemId}_o${option.id}`}>{option.choiceText}</label>
          </div>
         );
      })}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    errorMessage: state.quiz.errorMessage
   };
}

export default compose(
  connect(mapStateToProps, actions)
)(OptionsByID);
