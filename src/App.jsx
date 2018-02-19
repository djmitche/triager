import { PureComponent } from 'react';
import { object } from 'prop-types';
import firebase from 'firebase';

import './App.css';
import TriageList from './TriageList';
import withUser from './withUser';
import { auth } from './fire';

class App extends PureComponent {
  static defaultProps = {
    user: null,
  }

  static propTypes = {
    user: object,
  }

  constructor() {
    super();
    this.state = {
      error: null,
    };

    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  handleLoginClick() {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithRedirect(this.provider))
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleLogoutClick() {
    auth.signOut()
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { user } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <div>Error: { error.toString() }</div>
          <div>
            <button onClick={() => this.setState({ error: null })}>
              Clear
            </button>
          </div>
        </div>
      );
    }

    if (!user) {
      return <button onClick={() => this.handleLoginClick()}>Login</button>;
    }

    return (
      <div className="App">
        <h2>Welcome, {user.displayName}</h2>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <TriageList />
      </div>
    );
  }
}

export default withUser(App, { spinWhileLoading: true });
