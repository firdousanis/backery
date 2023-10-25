const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers 
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";
const ICE_RESTORED = "ICE_RESTORED";
const ORDER_ICECREAM = "ORDER_ICECREAM";
const OFFER_ORDERED = "OFFER_ORDERED";
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()



// action
function orderIcecream(quan) {
  return {
    type: ORDER_ICECREAM,
    payload: quan,
  };
}

function orderCake(count) {
  return {
    type: CAKE_ORDERED,
    payload: count,
  };
}
function refilCouter(numCake) {
  return {
    type: CAKE_RESTORED,
    payload: numCake,
  };
}
function refillingCouter(numICE) {
  return {
    type: ICE_RESTORED,
    payload: numICE,
  };
}
function offerOrdered(quantity) {
  return {
    type: OFFER_ORDERED,
    payload: {
      cake: quantity,
      iceCream: quantity,
    },
  };
}

const initStateCake = {
  numOfCake: 10,
};
const initStateIceCream = {
    numIceCream: 10,
  };

// shopkeeper
const cakereducer = (state = initStateCake, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - action.payload,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload,
      };
      case OFFER_ORDERED:
        const {cake} = action.payload;
        const newCakeStock = state.numOfCake - cake;
        return {
          ...state,
          numOfCake: newCakeStock >= 0 ? newCakeStock : 0, 
        };
     
    default:
      return state;
  }
};

const icereducer = (state = initStateIceCream, action) => {
  switch (action.type) {
    case ORDER_ICECREAM:
      return {
        ...state,
        numIceCream: state.numIceCream - action.payload,
      };
      case OFFER_ORDERED:
        const {iceCream } = action.payload;
        const newIceCreamStock = state.numIceCream - iceCream;
        return {
          ...state,
          numIceCream: newIceCreamStock >= 0 ? newIceCreamStock : 0,
        };
        case ICE_RESTORED:
          return {
            ...state,
            numIceCream: state.numIceCream + action.payload,
          };
    default:
      return state;
  }
};

const comReducer=combineReducers({cake:cakereducer,icecream:icereducer})

const store = createStore(comReducer,applyMiddleware(logger));
console.log("init state", store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log("subscriber call ", store.getState())
// );
store.dispatch(orderCake(1));
store.dispatch(orderIcecream(3));
store.dispatch(orderIcecream(3));
store.dispatch(refilCouter(10));
store.dispatch(offerOrdered(3));
store.dispatch(refillingCouter(5));
store.dispatch(offerOrdered(2));
store.dispatch(orderCake(1));
// unsubscribe()