import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-2xl text-green-700">FuelPriceInsights</Link>
          
        </div>

        <div>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/showcase">Showcase</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/pricing">Pricing</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/service">Service</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/fuel_quote_form">Fuel Form</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/history">Fuel Quote History</Link>
        </div>
        <div className="flex space-x-4 items-center">

          <Link className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" href="/login">
            <span className="mx-auto">Log In</span>
          </Link>
          <Link className="text-md flex items-center rounded-md hover:shadow-none px-4 py-1 bg-green-600 hover:bg-green-500 text-white" href="/signup">
            <span className="mx-auto">Sign Up</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;