import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import {Link} from "react-router-dom"
  
  export function LoginDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-[#FF4F5B] hover:bg-[#FF3B48] rounded-full">Login</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/signin" className="w-full">Login as User</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/login" className="w-full">Login as Seller</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  