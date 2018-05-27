import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import Title from '../glamorous/text/Title';
import FormGroup from '../glamorous/form/FormGroup';
import ControlLabel from '../glamorous/form/ControlLabel';
import FormControl from '../glamorous/form/FormControl';
import Button from '../glamorous/form/FormButton';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      user: ``,
      id: ``,
      loading: false,
      error: null,
      displayName: ``,
      photoURL: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null && currentUser.hasOwnProperty('displayName')) {
      this.setState({email: currentUser.displayName});
      let user = ``;
      let id = ``;
      if (this.state.user.length === 0) {
        firestore.collection('users').where('displayName', '==', currentUser.displayName).get()
          .catch((error) => {
            this.setState({error: error});
            this.setState({loading: false});
          })
          .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
              user = doc.data();
              id = doc.id;
            });
            this.setState({user: user});
            this.setState({id: id});
            this.setState({displayName: this.state.user.displayName});
            this.setState({photoURL: this.state.user.photoURL});
            this.setState({loading: false});
          });
      }
    } else {
      // this.props.history.push('/');
    }
  }

  validateForm() {
    return this.state.displayName.length > 0 && this.state.photoURL.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    let data = {
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
    };
    console.log(this.state.displayName);
    console.log(this.state.photoURL);
    firebase.auth().currentUser.updateProfile({
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        firestore.collection('users').doc(this.state.id).set(data)
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.props.history.push('/');
          });
      });
    event.preventDefault();
  };

  render() {
    let userDetailPage = ``;
    if (this.state.error) {
      userDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>{error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>Loading your profile...</Paragraph>
      </ContentContainer>;
    } else {
      userDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Title>Update your profile</Title>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="displayName" bsSize="large">
            <ControlLabel>Display Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              id="displayName"
              value={this.state.displayName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="photoURL" bsSize="large">
            <ControlLabel>Photo URL</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              id="photoURL"
              value={this.state.photoURL}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            type="submit"
            disabled={!this.validateForm()}
          >
            Save
          </Button>
        </form>
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {userDetailPage}
      </Container>
    );
  }
}

ProfilePage.propTypes = {};

export default withRouter(ProfilePage);
