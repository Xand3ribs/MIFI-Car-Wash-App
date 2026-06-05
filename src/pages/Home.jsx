import Header from '../components/header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />

      <main className="flex-grow">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
