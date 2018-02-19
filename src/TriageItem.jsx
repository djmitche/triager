import { PureComponent } from 'react';
import { func, shape, string, bool } from 'prop-types';
import { connect } from 'react-firebase';

class TriageItem extends PureComponent {
  static propTypes = {
    item: shape({
      key: string.isRequired,
      url: string.isRequired,
      claimedBy: string,
      finished: bool,
    }).isRequired,
    updateItem: func.isRequired,
  }

  render() {
    const { item, updateItem } = this.props;

    const claim = item.claimedBy ? (
      `[${item.claimedBy}]`
    ) : (
      <button onClick={() => updateItem({ ...item, claimedBy: 'me' })}>
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

export default connect((props, ref) => ({
  updateItem: (item) => {
    const { key, ...value } = item;
    ref(`triage-items/${key}`).set(value);
  },
}))(TriageItem);
