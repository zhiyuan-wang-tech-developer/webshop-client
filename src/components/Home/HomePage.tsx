import React from 'react'
import HomeNavBar from './HomeNavBar';
import ProductCardsContainer from '../InventoryItem/CardsContainer';
// import ItemCardContainer from '../Items/CardContainer';

export default function HomePage() {
    return (
        <React.Fragment>
            <HomeNavBar />
            <ProductCardsContainer />
        </React.Fragment>
    )
}
