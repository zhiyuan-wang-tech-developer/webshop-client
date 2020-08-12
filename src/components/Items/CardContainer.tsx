import React, { Component } from 'react'
import ItemCard from './Card'
import { Container, CardColumns } from 'react-bootstrap'
import { RootStateType } from '../../reducers/rootReducer'
import { fetchItems } from '../../actions/inventoryActions'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'

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

class ItemCardContainer extends Component<PropsFromRedux> {
    componentDidMount() {
        this.props.fetchItems()
    }

    render() {
        return (
            <Container fluid={true} style={{ paddingTop: 130 }}>
                <CardColumns>
                    {this.props.items.map((item, index) => (<ItemCard key={index} item={item} />))}
                </CardColumns>
            </Container>
        )
    }
}

export default connector(ItemCardContainer)