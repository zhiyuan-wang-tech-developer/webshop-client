import React from 'react'
import HomeNavBar from './HomeNavBar';
import ProductCards from '../InventoryItem/CardsConnector';

export default function HomePage() {
    return (
        <React.Fragment>
            <HomeNavBar />
            <ProductCards />
        </React.Fragment>
    )
}
