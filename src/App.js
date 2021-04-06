import React from "react";
import { createStore } from "redux";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

import reducer from './reducer';

import { Provider } from 'react-redux';
// redux stuff

const store = createStore(reducer);

console.log(store.getState());

function App() {
  // cart setup

  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
