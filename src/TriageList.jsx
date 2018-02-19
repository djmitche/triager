import { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-firebase';

import TriageItem from './TriageItem';

class TriageList extends PureComponent {
  static defaultProps = {
    ...PureComponent.defaultProps,
    triageItems: {},
  }

  static propTypes = {
    triageItems: object,
    addTriageItem: func.isRequired,
  }

  handleNewItem(event) {
    const { addTriageItem } = this.props;
    addTriageItem({ url: this.newItemElement.value });
    event.preventDefault();
  }

  render() {
    const { triageItems } = this.props;
    const items = Object.keys(triageItems)
      .map(k => ({ ...triageItems[k], key: k }));

    return (
      <div>
        <h3>Triage List</h3>
        <ul>
          {items.map(item => (
            <li key={item.key}><TriageItem item={item} /></li>
          ))}
        </ul>
        <h4>Add Item</h4>
        <form onSubmit={event => this.handleNewItem(event)}>
          <input type="url" name="new-item" ref={(elt) => { this.newItemElement = elt; }} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default connect((props, ref) => ({
  triageItems: {
    path: 'triage-items',
    orderByChild: 'url',
  },
  addTriageItem: item => ref('triage-items').push(item),
}))(TriageList);
