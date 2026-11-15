import Login from './pages/login/index.tsx'
import Home from './pages/home/index.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Detalhes from './pages/detalhes/index.tsx'
import Editar from './pages/editar/index.tsx'
import NotFound from './pages/notFound/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import ThemeContext from './contexts/themeContext.tsx'
import PrivateRoute from './components/PrivateRoute/index.tsx'

const queryClient = new QueryClient()

export default function App() {
  return (

    <Provider store={store}>
      <ThemeContext>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/aluno/:id" element={<Detalhes />} />
                <Route path="/aluno/:id/editar" element={<Editar />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeContext>
    </Provider>
  )
}
