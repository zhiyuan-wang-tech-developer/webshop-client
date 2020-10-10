import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { RootState } from '../../reducer/root.reducer'
import { fetchItems } from '../../actions/inventory.actions'
import { addToMyCart } from '../../actions/cart.actions'
import ProductCardsContainer from './cards.container'

const mapStateToProps = (state: RootState) => (
    {
        items: state.inventory.items
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