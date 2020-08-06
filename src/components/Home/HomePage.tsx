import React from 'react'
import HomeNavBar from './HomeNavBar';
import ItemCardContainer from '../Items/CardContainer';

export default function HomePage() {
    return (
        <React.Fragment>
            <HomeNavBar />
            <ItemCardContainer />
        </React.Fragment>
    )
}
