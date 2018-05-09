import React, {Component} from 'react';
import {Switch, withRouter, Route} from 'react-router-dom';
import HomePage from '../components/HomePage';
import UserOverviewPage from '../components/UserOverviewPage';
import UserDetailPage from '../components/UserDetailPage';
// import LeagueOverviewPage from '../components/LeagueOverviewPage';
// import LeagueDetailPage from '../components/LeagueDetailPage';
// import TournamentOverviewPage from '../components/TournamentOverviewPage';
// import TournamentDetailPage from '../components/TournamentDetailPage';

// We need a Root component for React Hot Loading
class Root extends Component {
    state = {
        firebase: false,
    };

    componentDidMount() {
        if (this.state.firebase === false) {
            this.initializeFirebase();
        }
    }

    initializeFirebase() {
      // const config = {
      //   apiKey: "AIzaSyCG3UHB04cRETXWBCXT70hJ4t7iaZ5H9fg",
      //   authDomain: "aeonofstrife-1.firebaseapp.com",
      //   databaseURL: "https://aeonofstrife-1.firebaseio.com",
      //   projectId: "aeonofstrife-1",
      //   storageBucket: "aeonofstrife-1.appspot.com",
      //   messagingSenderId: "603290881912"
      // };
      // firebase.initializeApp(config);
      this.state.firebase = true;
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/users' component={UserOverviewPage}/>
                <Route exact path='/users/:user' component={UserDetailPage}/>
                {/*<Route exact path='/leagues' component={LeagueOverviewPage}/>*/}
                {/*<Route exact path='/leagues/:league' component={LeagueDetailPage}/>*/}
                {/*<Route exact path='/tournaments' component={TournamentOverviewPage}/>*/}
                {/*<Route exact path='/tournaments/:tournament' component={TournamentDetailPage}/>*/}
            </Switch>
        );
    }
}

export default withRouter(Root);
