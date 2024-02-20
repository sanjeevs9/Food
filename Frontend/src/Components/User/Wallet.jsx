import Footer from "../Footer";
import Navbar from "./Navbar";
import construct from '../../../public/construct.svg'

export default  function Wallet(){
return(
    <>
    <div className="min-h-full">
    <Navbar/>
    <img src={construct}></img>
    <Footer />
    </div>
    
    </>
)
}