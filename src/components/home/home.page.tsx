import React from 'react'
import HomeNavBar from './home.nav.bar';
import ProductCards from '../inventory-item/cards.connector';

export default function HomePage() {
    return (
        <React.Fragment>
            <HomeNavBar />
            <ProductCards />
        </React.Fragment>
    )
}
