import React, { Component } from 'react';
import requireAuth from '../hoc/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Options from './OptionsByID';

class QuizByID extends Component {

  constructor(props) {
    super(props);
    this.state = {
      AttemptId: 0,
      ButtonName: 'Submit',
      Disabled: '',
      ErrorMessage: '',
      ItemCount: 0,
      Name: '',
      Stems: [],
      SubmitDisabled: 'disabled',
      Submitted: false
    };
  }

  componentDidMount() {
    this.props.getUserInfo((id) => {
        if(!id) {
          this.props.history.push('/')
        } else {
          let quizProps = { "id": this.props.location.state.quiz_id, "token": localStorage.getItem('token') };

          this.props.getQuizByID(quizProps, (data) => {
            let quiz = JSON.parse(data);
            this.setState({
              Name: quiz.name,
              ItemCount: quiz.length,
              ErrorMessage: this.props.errorMessage
            });
          });

          this.props.getStemsByID(quizProps, (data) => {
            this.setState({
              Stems: data
            });
          });
        };
    });

    let attemptProps = {
          "UserQuizId": this.props.location.state.user_quiz_id
        }
    this.props.submitAttempt(attemptProps, (data) => {
      this.setState({
        AttemptId: data.attempt_id
      });
    });
  }

  onSubmit = submitProps => (e) => {
    e.preventDefault();
    if(this.state.ButtonName === 'Submit'){
      let userResponses = [];
      this.state.Stems.map((stem, i) => {
        return userResponses.push(e.target[`q${stem.id}`].value);
      })

      this.setState({
        Disabled: 'disabled',
        SubmitDisabled: 'disabled',
        Submitted: true
      })

      let submitProps = { "UserResponses": userResponses, "token": localStorage.getItem('token')  };
      this.props.gradeAttempt(submitProps, (data) => {
        let attemptProps = {
            	"Id": this.state.AttemptId,
              "UserQuizId": this.props.location.state.user_quiz_id,
            	"QuizScore": this.props.quizScore,
            	"QuizItems": this.props.quizItemCount
            }
        this.props.updateAttempt(attemptProps, (data) => {
          this.setState({
            ButtonName: 'Go to Dashboard',
            ErrorMessage: 'Attempt Saved',
            SubmitDisabled: ''
          });
        });
      });
    } else if(this.state.ButtonName === 'Go to Dashboard'){
      this.props.history.push('/dashboard');
    }
  };

  enableButton = () => {
    this.setState({SubmitDisabled: ''})
  }

  render() {

    return (
      <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
              <h3>{this.state.Name}</h3>
              <div>&nbsp;</div>
              <form name="form" onSubmit={this.onSubmit()}>
                {this.state.Stems.map((stem, i) => {
                   return (
                     <div key={i}>{i + 1}. {stem.itemText}
                      <br /><br />
                      <Options options_id={stem.id} disabled={this.state.Disabled} enableButton={this.enableButton} />
                      <br /><br />
                     </div>
                   );
                })}
                <div className="form-group">
                  {this.state.ErrorMessage}<br />
                  <button className="btn btn-primary" disabled={this.state.SubmitDisabled}>{this.state.ButtonName}</button>
                </div>
              </form>
          </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    errorMessage: state.quiz.errorMessage,
    quizScore: state.quiz.quizScore,
    quizItemCount: state.quiz.quizItemCount
  };
}

export default requireAuth(compose(
  connect(mapStateToProps, actions)
)(QuizByID));
