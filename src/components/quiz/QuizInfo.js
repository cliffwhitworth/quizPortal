import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class QuizInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Id: 0,
    };
  }

  componentDidMount() {
    let quizProps = { "id": this.props.quiz_id, "token": localStorage.getItem('token') };
    this.props.getQuizByID(quizProps, (data) => {
      let quiz = JSON.parse(data);
      this.setState({
        Name: quiz.name,
        Id: quiz.id
      });
    });
  }

  checkDate () {
    var now = new Date().toISOString();
    if(now > this.props.open && now < this.props.close){
      return(
        <Link to={{ pathname: '/quizbyid', state: { quiz_id: this.state.Id, user_quiz_id: this.props.user_quiz_id } }} className="btn btn-link">{ this.state.Name }</Link>
      )
    }else{
      return(
        <span> {this.state.Name} is not available</span>
      )
    };

  }

  render() {
    return (
      <div>
        {this.checkDate()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { errorMessage: state.quiz.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions)
)(QuizInfo);
