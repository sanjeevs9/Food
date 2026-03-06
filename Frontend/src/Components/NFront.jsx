import {Link, useNavigate} from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Github } from 'lucide-react'
import { Testimonial } from "@/Components/Testimonial"
import logo from "../img/logo.png"
import { LoginDropdown } from "@/Components/LoginDropdown"
import { SignupDropdown } from "@/Components/SignupDropdown"
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
    <div className="min-h-screen bg-[#FAFAF8] relative overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")'}} />

      <div className="relative z-10">
        {/* Nav */}
        <header className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex items-center justify-between border border-stone-200 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Logo" className="w-9 h-9 rounded-full" />
              <span className="font-['Fraunces'] font-semibold text-lg text-stone-900">SnackSync</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-['Outfit'] text-sm" asChild>
                <Link onClick={handle}>Dashboard</Link>
              </Button>
              <Button variant="ghost" className="rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-['Outfit'] text-sm" asChild>
                <Link to="/help">Contact</Link>
              </Button>
              <div className="w-px h-5 bg-stone-200 mx-1" />
              <SignupDropdown />
              <LoginDropdown />
            </div>
          </nav>
        </header>

        {/* Hero */}
        <main className="max-w-6xl mx-auto px-6 pt-16 md:pt-28 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Fresh & Fast Delivery
            </div>

            <h1 className="font-['Fraunces'] text-5xl md:text-7xl font-semibold text-stone-900 leading-[1.1] tracking-tight mb-6">
              Discover the art of
              <span className="block text-orange-700 italic">great food</span>
            </h1>

            <p className="font-['Outfit'] text-lg text-stone-500 mb-12 max-w-lg mx-auto leading-relaxed">
              Order from the finest local restaurants and enjoy curated culinary experiences delivered to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-none font-['Outfit'] font-medium text-sm h-12 px-8 transition-all"
                asChild
              >
                <Link onClick={LoginUser}>Join as User</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 rounded-xl shadow-none font-['Outfit'] font-medium text-sm h-12 px-8 transition-all"
                asChild
              >
                <Link onClick={LoginSeller}>Join as Vendor</Link>
              </Button>
            </div>

            <div className="mt-4">
              <Button disabled={true}
                size="sm"
                variant="ghost"
                className="text-stone-400 font-['Outfit'] text-sm rounded-xl"
                asChild
              >
                <div>Guest access coming soon</div>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mt-20 mb-16">
            <div className="text-center">
              <div className="font-['Fraunces'] text-3xl font-semibold text-stone-900">50+</div>
              <div className="font-['Outfit'] text-sm text-stone-500 mt-1">Restaurants</div>
            </div>
            <div className="text-center border-x border-stone-200">
              <div className="font-['Fraunces'] text-3xl font-semibold text-stone-900">1k+</div>
              <div className="font-['Outfit'] text-sm text-stone-500 mt-1">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="font-['Fraunces'] text-3xl font-semibold text-stone-900">4.8</div>
              <div className="font-['Outfit'] text-sm text-stone-500 mt-1">Avg Rating</div>
            </div>
          </div>

          {/* Testimonial */}
          <section className="mt-8">
            <h2 className="font-['Fraunces'] text-2xl font-semibold text-center mb-8 text-stone-900">What people are saying</h2>
            <Testimonial />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200 mt-16 py-6 bg-white/60 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <p className="font-['Outfit'] text-sm text-stone-400">&copy; 2024 SnackSync</p>
            <Button variant="ghost" className="text-stone-400 hover:text-stone-600 rounded-xl font-['Outfit'] text-sm" asChild>
              <Link to="https://github.com/sanjeevs9/Food" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1.5" />
                Source
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
