import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import {Link} from "react-router-dom"
  
  export function SignupDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-[#FF4F5B] text-[#FF4F5B] hover:bg-[#FF4F5B] hover:text-white rounded-full">
            Sign Up
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/signup" className="w-full">Sign Up as User</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/create" className="w-full">Sign Up as Seller</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  