import Login from './pages/login/index.tsx'
import Home from './pages/home/index.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import ThemeContext from './contexts/themeContext.tsx'

const queryClient = new QueryClient()

export default function App() {
  return (

    <ThemeContext>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeContext>
  )
}
