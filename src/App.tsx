import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Loader } from 'lucide-react';

// Contexts
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';

// Components
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import LegalConsent from '@/components/LegalConsent';

// Lazy Loaded Pages
const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));

const Technology = lazy(() => import('@/pages/Technology'));
const Impact = lazy(() => import('@/pages/Impact'));
const Cart = lazy(() => import('@/pages/Cart'));

// Legal Pages
const Privacy = lazy(() => import('@/pages/legal/Privacy'));
const Terms = lazy(() => import('@/pages/legal/Terms'));
const Refund = lazy(() => import('@/pages/legal/Refund'));

const PageLoader = () => (
    <div className="min-h-screen bg-[#051a14] flex items-center justify-center">
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
    </div>
);

function App() {
    return (
        <HelmetProvider>
            <CartProvider>
                <ToastProvider>
                    <Router>
                        <ScrollToTop />
                        <Layout>
                            <Suspense fallback={<PageLoader />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/products" element={<Products />} />

                                    <Route path="/technology" element={<Technology />} />
                                    <Route path="/impact" element={<Impact />} />
                                    <Route path="/cart" element={<Cart />} />

                                    {/* Legal Routes */}
                                    <Route path="/privacy" element={<Privacy />} />
                                    <Route path="/terms" element={<Terms />} />
                                    <Route path="/refund" element={<Refund />} />
                                </Routes>
                            </Suspense>
                            <LegalConsent />
                        </Layout>
                    </Router>
                </ToastProvider>
            </CartProvider>
        </HelmetProvider>
    );
}

export default App;
