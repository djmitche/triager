import { Component } from 'react';

import { auth } from './fire';

/**
 * Higher-order component to provide the wrapped component with `user` property.
 *
 * If `spinWhileLoading` is true, then the wrapped component is not shown until
 * it is known if the user is logged in or not (an async operation).  In that
 * case, a spinner is shown in the interim.  Otherwise, `user` is initially null.
 */
export default function withUser(Wrapped, { spinWhileLoading } = {}) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
        userLoading: true,
      };
    }

    componentDidMount() {
      this.stopListening = auth.onAuthStateChanged(
        user => this.setState({ user, userLoading: false }),
      );
    }

    componentWillUnmount() {
      if (this.stopListening) {
        this.stopListening();
        this.stopListening = null;
      }
    }

    render() {
      if (this.state.userLoading && spinWhileLoading) {
        return 'Loading...';
      }
      return <Wrapped user={this.state.user} {...this.props} />;
    }
  };
}
