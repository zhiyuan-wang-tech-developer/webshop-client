import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { RootState } from '../../reducer/rootReducer'
import { fetchItems } from '../../actions/inventoryActions'
import { addToMyCart } from '../../actions/cartActions'
import ProductCardsContainer from './CardsContainer'

const mapStateToProps = (state: RootState) => (
    {
        items: state.inventoryState.items
    }
)

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        onFetchItems: () => fetchItems(),
        onAddToMyCart: (itemId: number) => addToMyCart(itemId)
    },
    dispatch
)

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ProductCardsPropsFromRedux = ConnectedProps<typeof connector> // inferred type

const ProductCards = connector(ProductCardsContainer)

export default ProductCards