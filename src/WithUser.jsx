import { Component } from 'react';
import { func } from 'prop-types';
import firebase from 'firebase';

import { auth } from './fire';

/**
 * TODO:
 *  - use a HOC instead
 *  - redirect instead of popup?
 */

/**
 * Request that the user login if necessary, then call children(user)
 */
export default class WithUser extends Component {
  static propTypes = {
    children: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      error: null,
      user: null,
    };

    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => this.handleAuthStateChanged(user));
  }

  handleAuthStateChanged(user) {
    this.setState({ user, loading: false });
  }

  handleLoginClick() {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => auth.signInWithPopup(this.provider))
      .catch((error) => {
        this.setState({ error, user: null });
      });
  }

  render() {
    const { error, loading, user } = this.state;

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

    if (loading) {
      return <div>loading..</div>;
    }

    if (!user) {
      return <button onClick={() => this.handleLoginClick()}>Login</button>;
    }

    return this.props.children(user);
  }
}
