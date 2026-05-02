import Hero from "./components/Hero";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    
      <div className="container flex flex-col">
        <Header />

        <main className="flex-grow">

          <Hero />
        </main>

        <Footer />
      </div>
    
  );
}

export default App;