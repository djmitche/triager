import { PureComponent } from 'react';

import './App.css';
import TriageList from './TriageList';
import WithUser from './WithUser';

export default class App extends PureComponent {
  render() {
    return (
      <WithUser>
        {user => (
          <div className="App">
            <h2>Welcome, {user.displayName}</h2>
            <TriageList />
          </div>
        )}
      </WithUser>
    );
  }
}
