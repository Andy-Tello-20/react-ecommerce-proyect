import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductListPage } from './pages/products/ProductListPage';
import { CartPage } from './pages/carts/CartPage';
import { ProductDetailPage } from './pages/products/ProductDetailPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { UserProfile } from './pages/profile/UserProfile';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider2 } from './context/myContexts/sesionContext2';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import PublicRoute from './pages/auth/PublicRoute';
import { CartLengthProvider } from './context/providers/CartLengthProvider';
import { LoginProvider } from './context/providers/LoginProvider';




function App() {
  return (


    <SessionProvider2>
      <CartLengthProvider>
        <LoginProvider>


          <BrowserRouter>
            <ToastContainer />


            <Routes>


              <Route element={<MainLayout />}>

                <Route path='/' element={<ProductListPage />}>

                  <Route path='verMas/:id' element={<ProductListPage />} />

                </Route>



                <Route path='/cart' element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />


                <Route path='/product/:id' element={<ProductDetailPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />

                <Route path='/profile' element={

                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>

                }
                />

              </Route>




              <Route element={<AuthLayout />}>
                <Route path='/login' element={

                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>

                }
                />



                <Route path='/register' element={

                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>


                }
                />
              </Route>


            </Routes>


          </BrowserRouter >


        </LoginProvider>
      </CartLengthProvider>
    </SessionProvider2>
  );
}

export default App;
