import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Attempts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Attempts: []
    };
  }

  componentDidMount() {
    let quizProps = { "user_quiz_id": this.props.user_quiz_id, "token": localStorage.getItem('token') };
    this.props.getAttemptsByUserQuizID(quizProps, (data) => {
      this.setState({
        Attempts: data
      });
    });

  }

  showAttempts = () => {
    if(this.state.Attempts.length > 0){
      return this.state.Attempts.map((attempt, i) => {
         return (
          <li key={i}>Attempt made on { attempt.scoreDate.split('T')[0] } has a score of { attempt.quizScore } out of { attempt.quizItems }</li>
         );
      })
    } else {
      return 'No quiz attempts recorded'
    }
  }

  render() {
    return (
      <ul>
        {this.showAttempts()}
      </ul>
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
)(Attempts);
