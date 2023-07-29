import Navbar from '../components/Navbar';
import NavbarAuth from '../components/NavbarAuth';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-center items-center">
      <NavbarAuth />
      <div className="w-full">
        <div className="bg-cover bg-center h-screen" 
            style={{ backgroundImage: "url('https://example.com/path-to-your-image.jpg')" }}>
          <div className="flex items-center justify-center w-full h-full bg-opacity-50">
            <div className="text-center">
              <h1 className="text-black text-2xl lg:text-6xl mb-4">Welcome to Fuel Price Insights</h1>
              <p className="text-black text-xl">Your reliable fuel provider</p>
              <Link href="/fuelform">
                <p className="px-4 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg mx-auto mt-5 text-2xl">Get a Quote</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
