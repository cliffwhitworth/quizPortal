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
      ButtonName: 'Submit',
      Name: '',
      Stems: [],
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
              Name: quiz.name
            });
          });

          this.props.getStemsByID(quizProps, (data) => {
            this.setState({
              Stems: data
            });
          });
        };
    });
  }

  onSubmit = submitProps => (e) => {
    e.preventDefault();
    if(this.state.ButtonName === 'Submit'){
      let userResponses = [];
      this.state.Stems.map((stem, i) => {
        userResponses.push(e.target[`q${stem.id}`].value);
        return 'ok';
      })

      let score = 0;
      let submitProps = { "UserResponses": userResponses, "token": localStorage.getItem('token')  };
      this.props.gradeQuiz(submitProps, () => {
        this.setState({
          Submitted: true,
          ButtonName: 'Go to Dashboard'
        })
        // this.props.history.push('/dashboard');
      });
    } else if(this.state.ButtonName === 'Go to Dashboard'){
      this.props.history.push('/dashboard');
    }

  };

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
                      <Options options_id={stem.id} />
                      <br /><br />
                     </div>
                   );
                })}
                <div className="form-group">
                    <button className="btn btn-primary">{this.state.ButtonName}</button>
                </div>
              </form>
          </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { errorMessage: state.quiz.errorMessage };
}

export default requireAuth(compose(
  connect(mapStateToProps, actions)
)(QuizByID));
