import { atom } from "recoil";

export const alertState=atom({
    key:"alerAtom",
    default:[]
})

export const checkbox=atom({
    key:"checkBox",
    default:true
})

export const sellerCheckBox=atom({
    key:"scheckbox",
    default:true
})

export const sidebar=atom({
    key:"sidebar",
    default:"false"
})