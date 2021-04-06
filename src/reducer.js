import { CLEAR_CART, DECREASE, GET_TOTAL, INCREASE, REMOVE, TOGGLE_AMOUNT } from "./actions";
// items
import cartItems from "./cart-items";
const initialState = {
    cart: cartItems,
    total: 105,
    amount: 5
}
const reducer = (state = initialState, action) => {
    console.log({ state, action });
    switch (action.type) {
        case CLEAR_CART:
            return { ...state, cart: [], total: 0, amount: 0 };
        case DECREASE:
            let tempCart1 = [];
            if (action.payload.amount === 1) {
                tempCart1 = state.cart.filter((item) => item.id !== action.payload.id);
            } else {
                tempCart1 = state.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        item = { ...item, amount: item.amount - 1 };
                    }
                    return item;
                })
            }
            return { ...state, cart: tempCart1 };
        case INCREASE:
            let tempCart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item = { ...item, amount: item.amount + 1 };
                }
                return item;
            })
            return { ...state, cart: tempCart };
        case REMOVE:
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
        case GET_TOTAL:
            let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
                const itemTotal = cartItem.amount * cartItem.price;
                cartTotal.total += itemTotal;
                cartTotal.amount += cartItem.amount
                return cartTotal;
            }, {
                total: 0,
                amount: 0
            })
            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount };
        case TOGGLE_AMOUNT:
            return {
                ...state, cart: state.cart.map((cartItem) => {
                    if (cartItem.id === action.payload.id) {
                        if (action.payload.toggle === 'inc') {
                            return cartItem = { ...cartItem, amount: cartItem.amount + 1 }
                        }
                        if (action.payload.toggle === 'dec') {
                            return cartItem = { ...cartItem, amount: cartItem.amount - 1 }
                        }

                    }
                    return cartItem
                })
            }
        default:
            return state
    }
}

export default reducer;