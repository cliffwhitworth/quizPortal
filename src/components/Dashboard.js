import React, { Component } from 'react';
import requireAuth from './hoc/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import QuizInfo from './quiz/QuizInfo';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Firstname: '',
      // Middlename: '',
      // Lastname: '',
      // Username: '',
      // UserId: '',
      Score: '0/0',
      Completed: 'No',
      Comments: '',
      Quizzes: []
    };
  }

  componentDidMount() {
    this.props.getUserInfo((id) => {
        let userProps = { "id": id, "token": localStorage.getItem('token') };
        this.props.getQuizzesByUser(userProps, (quizzes) => {
          this.setState({
            Quizzes: quizzes
          });
        });
    });
  }

  componentWillUnmount() {
    // console.log(this);
  }

  render() {

    return (
        <div className="jumbotron jumbotron-fluid mb-0 p-5">
          <div className="container text-left">
            <h3>Hello { this.props.firstname + ' ' + this.props.lastname }</h3>
            <h3>Available Quizzes:</h3>
            <hr />
            <div className="pt-2">
              <table>
              <tbody>
              <tr><th className="text-center px-1">QuizName</th><th className="px-2">Completed</th><th className="px-2">Grade</th><th className="px-2">Comments</th></tr>
              {this.state.Quizzes.map((quiz, i) => {
                 return (
                   <tr key={i}>
                    <td className="px-1"><QuizInfo quiz_id={quiz.quizId} /></td>
                    <td className="px-2">{this.state.Completed}</td>
                    <td className="px-2">{this.state.Score}</td>
                    <td className="px-2">{this.state.Comments}</td>
                   </tr>
                 );
              })}
              </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    firstname: state.auth.firstname,
    middlename: state.auth.middlename,
    lastname: state.auth.lastname,
    username: state.auth.username,
    userid: state.auth.id
  };
}

export default requireAuth(compose(
  connect(mapStateToProps, actions)
)(Dashboard));
