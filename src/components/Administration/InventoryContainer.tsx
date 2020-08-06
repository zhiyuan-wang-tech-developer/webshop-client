import React, { Component } from "react";
import { Navbar } from 'react-bootstrap';
import InventoryTable from './InventoryTable';
import AddWindow from './AddWindow';
import { fetchItems } from '../../reducers/inventory/actions';
import { RootStateType } from '../../reducers/rootReducer'
import { connect, ConnectedProps } from 'react-redux';
import { ItemType } from "../Types/CustomTypes";
import { Dispatch, AnyAction, bindActionCreators } from "redux";

const mapStateToProps = (state: RootStateType) => (
  {
    items: state.inventoryState.items
  }
)

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    fetchItems
  },
  dispatch
)

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector> // inferred type

type InventoryContainerState = {
  items: ItemType[],
  showAddWindow: boolean
}

class InventoryContainer extends Component<PropsFromRedux, InventoryContainerState> {
  state = {
    items: [],
    showAddWindow: false
  };

  openAddWindow = () => { this.setState({ showAddWindow: true }) };
  closeAddWindow = () => { this.setState({ showAddWindow: false }) };

  refreshInventory = () => {
    this.props.fetchItems()
    this.setState({
      items: [...this.props.items]
    })
  }

  componentDidMount() {
    this.refreshInventory()
  }

  render() {
    return (
      <div>
        <InventoryTable items={this.props.items} />
        <AddWindow show={this.state.showAddWindow} onHide={this.closeAddWindow} />
        <Navbar bg="info" variant="dark" fixed="bottom">
          <Navbar.Brand href="/admin" className="col-sm-6">
            <span className="fa fa-refresh fa-lg d-inline-block align-middle" onClick={this.refreshInventory}>&nbsp;Refresh</span>
          </Navbar.Brand>
          <Navbar.Brand className="col-sm-6">
            <span className="fa fa-pencil fa-lg d-inline-block align-middle" onClick={this.openAddWindow}>&nbsp;Add</span>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default connector(InventoryContainer)