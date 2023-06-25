import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-2xl text-green-700">FuelPriceInsights</Link>
        </div>
        <div className="flex space-x-4 items-center">
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/">About</Link>
          <Link className="text-md flex items-center shadow-lg rounded-lg hover:shadow-none px-4 py-1 bg-gray-900 text-white" href="/login">
            <span className="mx-auto">Log In</span>
          </Link>
          <Link className="text-md flex items-center shadow-lg rounded-lg hover:shadow-none px-4 py-1 bg-green-600 text-white" href="/signup">
            <span className="mx-auto">Sign Up</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;