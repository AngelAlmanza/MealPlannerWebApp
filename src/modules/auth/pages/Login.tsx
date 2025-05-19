import { Button } from "@/core/components/ui/button"
import { useAppDispatch } from "@/core/store/hooks"
import { setIsAuthenticated } from "@/core/store/slices"
import { useNavigate } from "react-router-dom"

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true")
    dispatch(setIsAuthenticated(true))
    navigate("/")
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default Login