import {Link, useNavigate} from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Github } from 'lucide-react'
import { Testimonial } from "@/Components/Testimonial"
import image from "../img/food/m2.png"
import logo from "../img/logo.png"
import { LoginDropdown } from "@/Components/LoginDropdown"
import { SignupDropdown } from "@/Components/SignupDropdown"
import { FoodIcons } from "@/Components/FoodIcons"
import { errorToast } from "../toast";
import axios from "axios"
import { NETWORK } from "../../network";
import { AdminLogin } from "../atoms/AdminLogin"
import { useRecoilState } from "recoil"
import { successToast } from "../toast"


export default function LandingPage() {
  let token = localStorage.getItem("token");
  const [adminlogin,setAdminLogin]=useRecoilState(AdminLogin);
  const navigate =useNavigate();

  async function handle() {
    if (!token) {
        token=sessionStorage.getItem("token");
         if(!token){
         errorToast("Please login or Create your account")
         return;
        } 
    }
    await axios
      .post(
        `${NETWORK}/food/local`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        {
          res.data === "user" ? navigate("/user") : navigate("/vendor");
        }
      })
      .catch((error) => {
        errorToast(error.response.data.message)
        // alert(error.response.data.message);
  
      });
  }

  async function LoginUser(){
    await axios.post(`${NETWORK}/food/user/signin`,
        {
            email:"guest1@gmail.com",
            password:"password"
        }
    ).then(res=>{
        successToast(res.data.message)
        sessionStorage.setItem("token",`Bearer ${res.data.token}`);
        navigate("/user");
    }).catch(err=>{
        errorToast(err.response.data.message);
        console.log(err)
    })
  }

  async function LoginSeller(){
    await axios.post(`${NETWORK}/food/seller/signin`,{
        phoneNumber:993166,
        password:"password"
    }).then(res=>{
        successToast(res.data.message);
        sessionStorage.setItem("token",`Bearer ${res.data.token}`)
        setAdminLogin(!adminlogin)
        navigate("/vendor");
        
    }).catch(err=>{

      
        errorToast(err.response.data.message);
    })
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F0] to-[#FFE5E0] relative overflow-hidden">
      {/* Background food image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Background Food"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Decorative food icons */}
      <FoodIcons />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Link href="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="font-bold text-xl text-[#FF4F5B]">SnackSync</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="rounded-full" asChild>
                <Link onClick={handle}>Dashboard</Link>
              </Button>
              <Button variant="ghost" className="rounded-full" asChild>
                <Link to="/help">Contact Us</Link>
              </Button>
              <SignupDropdown />
              <LoginDropdown />
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-800">
              <span className="text-[#FF4F5B]">Welcome</span> to
              <div className="text-4xl md:text-5xl mt-2">The World Of</div>
              <div className="text-3xl md:text-4xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF4F5B] to-[#FF8C42]">
                Tasty and Fresh Food
              </div>
            </h1>

            <p className="text-xl text-gray-600 mb-12">
              Discover, order, and enjoy the finest culinary experiences right at your fingertips.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              <Button 
                size="lg" 
                className="bg-[#FF4F5B] hover:bg-[#FF3B48] text-white rounded-full shadow-lg transform transition-transform hover:scale-105" 
                asChild
              >
                <Link onClick={LoginUser}>Join as User</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#FF4F5B] text-[#FF4F5B] hover:bg-[#FF4F5B] hover:text-white rounded-full shadow-lg transform transition-transform hover:scale-105"
                asChild
              >
                <Link onClick={LoginSeller}>Join as Vendor</Link>
              </Button>
            </div>

            <div className="mt-8">
              <Button disabled={true}
                size="lg" 
                variant="secondary"
                className="w-full md:w-auto rounded-full shadow-lg transform transition-transform"
                asChild
              >
                <div >Join as Guest</div>
              </Button>
            </div>
          </div>

          {/* Testimonial Section */}
          <section className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Customers Say</h2>
            <Testimonial />
          </section>
        </main>

        <footer className="mt-24 py-6 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p className="text-gray-600">&copy; 2023 FoodieHub. All rights reserved.</p>
            <Button variant="ghost" className="text-gray-600" asChild>
              <Link to="https://github.com/sanjeevs9/Food" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Github
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}