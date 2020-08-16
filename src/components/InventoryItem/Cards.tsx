import React, { Component } from 'react'
import { Container, CardColumns } from 'react-bootstrap'
import { ProductCardsPropsFromRedux } from './CardsContainer'
import ProductCard from './Card'

export default class ProductCards extends Component<ProductCardsPropsFromRedux> {
    componentDidMount() {
        this.props.onFetchItems()
    }

    render() {
        return (
            <Container fluid={true} style={{ paddingTop: 130 }}>
                <CardColumns>
                    {this.props.items.map((item, index) => (<ProductCard key={index} item={item} addToMyCart={() => this.props.onAddToMyCart(item.id)} />))}
                </CardColumns>
            </Container>
        )
    }
}