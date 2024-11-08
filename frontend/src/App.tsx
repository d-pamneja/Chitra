import { Routes, Route } from 'react-router-dom'
import { nav } from './structure/navigation';
import Header from './components/Header'
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer';


function App() {

  const auth = useAuth()
  console.log("Auth Status:", auth?.isLoggedIn);

  return (
    <main className="min-h-screen bg-[#05101c] text-white font-sans overflow-x-hidden">
      <Header />
      <Routes>
        {nav.map((r, i) => {
            if (!r.isRestricted) {
              return <Route key={i} path={r.path} element={r.element} />;
            } else if (r.name === "Chat") {
              if(auth?.isLoggedIn){
                return (
                  <Route
                    key={i}
                    path={r.path}
                    element={r.element}
                  />
                );
              }
            }
            return null;
          })}
      </Routes>
      <Footer/>
    </main>
  )
}

export default App;
