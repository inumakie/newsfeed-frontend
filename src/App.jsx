import { Link, Route, Routes } from 'react-router-dom'
import Feed from './components/Feed'
import Login from './components/Login'
import Register from './components/Register'
import useAuthContext from './context/AuthContext';
import User from './components/User'

function App() {

  const { user, logout } = useAuthContext();

  return (
    <div className='bg-purple-300 min-h-screen'>
      <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">

          <Link
            to="/"
            className="block rounded py-2 pr-4 pl-3 text-white"
            aria-current="page"
            >Newsfeed</Link>

          <div className="hidden w-full md:block md:w-auto">
            <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
              {user ? (
                <>
                  <li>
                    <button onClick={logout} className="block rounded py-2 pr-4 pl-3 text-white">Logout</button>
                  </li>
                  <li>
                    <Link
                      to="/user"
                      className="block rounded py-2 pr-4 pl-3 text-white"
                      aria-current="page"
                      >User</Link>
                </li>
                </>

                
              ) : (
              <>

                <li>
                  <Link
                    to="/login"
                    className="block rounded py-2 pr-4 pl-3 text-white"
                    aria-current="page"
                    >Login</Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block rounded py-2 pr-4 pl-3 text-white"
                    aria-current="page"
                    >Register</Link>
                </li>
              </>
              )}
            
            </ul>
          </div>
        </div>
      </nav>
      <div className='max-w-7xl mx-auto mt-6'>
        <Routes>
          <Route path='/' element={<Feed/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/user' element={<User/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
