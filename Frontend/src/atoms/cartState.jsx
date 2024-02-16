import {atom,atomFamily, selector} from "recoil"

export const cartState=atom({
    key:"cartState",
    default:[]
})

export const cartSize=selector({
    key:"cartSize",
    get: ({get})=>{
        const cart=get(cartState)
        return cart.length
    }
})

export const numberState = atomFamily({
    key: 'numberState',
    default: 1, // default value
  });
  
  export const costState = atomFamily({
    key: 'costState',
    default: 0// default value is the price of the item
  });