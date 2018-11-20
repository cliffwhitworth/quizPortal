import React, { Component } from 'react';
import requireAuth from './hoc/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import QuizInfo from './quiz/QuizInfo';
import Attempts from './quiz/Attempts';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Quizzes: []
    };
  }

  componentDidMount() {
    this.props.getUserInfo((id) => {
        if(id === 0) this.props.history.push('/signout');
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
            <div>
              {this.state.Quizzes.map((quiz, i) => {
                 return (
                   <div key={i}>
                    <strong><QuizInfo quiz_id={quiz.quizId} user_quiz_id={quiz.id} open={quiz.open} close={quiz.close} /></strong>
                    <div className="pl-4">Attempts:</div>
                    <div className="pl-4"><Attempts user_quiz_id={quiz.id} /></div>
                   </div>
                 );
              })}
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
