import { atom } from "recoil";

export const alertState=atom({
    key:"alerAtom",
    default:[]
})

export const checkbox=atom({
    key:"checkBox",
    default:false
})

export const sellerCheckBox=atom({
    key:"scheckbox",
    default:false
})

export const sidebar=atom({
    key:"sidebar",
    default:"false"
})