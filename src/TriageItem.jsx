import { PureComponent } from 'react';
import { func, object, shape, string, bool } from 'prop-types';
import { connect } from 'react-firebase';
import withUser from './withUser';

class TriageItem extends PureComponent {
  static propTypes = {
    user: object,
    item: shape({
      key: string.isRequired,
      url: string.isRequired,
      claimedBy: string,
      finished: bool,
    }).isRequired,
    updateItem: func.isRequired,
  }

  handleClaimClick() {
    const { item, user, updateItem } = this.props;
    // note: user might still be undefined here?
    updateItem({ ...item, claimedBy: user.email });
  }

  render() {
    const { item } = this.props;

    const claim = item.claimedBy ? (
      `[${item.claimedBy}]`
    ) : (
      <button onClick={() => this.handleClaimClick()}>
        Claim
      </button>
    );

    return (
      <span>
        {item.url}
        {' '}
        {claim}
      </span>
    );
  }
}

export default withUser(connect((props, ref) => ({
  updateItem: (item) => {
    const { key, ...value } = item;
    ref(`triage-items/${key}`).set(value);
  },
}))(TriageItem));
