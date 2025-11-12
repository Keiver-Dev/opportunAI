// NotFound.tsx
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// Background
import Background from "@/assets/Background.jpg"

export default function NotFound() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState<number>(10)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown <= 1) navigate("/dashboard")
      else setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#141414] text-white p-4 relative">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
        style={{ backgroundImage: `url(${Background})` }}
      />

      <h1 className="text-9xl font-bold text-zinc-500 mb-6 z-20">404</h1>
      <h2 className="text-2xl font-semibold mb-2 z-20">
        Page Not Found
      </h2>

      <p className="text-zinc-400 mb-1 z-20">
        This page doesn’t exist or was moved.
      </p>

      <p className="text-sm text-zinc-500 mb-8 z-20">
        Redirecting in {countdown}s...
      </p>
    </div>
  )
}
