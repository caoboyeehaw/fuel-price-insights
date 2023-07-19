import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="container mx-auto mt-3">
      <nav className="flex justify-between items-center">
      <div>
        <Link href="/">
          <div className="font textxl text-green-700 flex items-center">
            <Image src="/FPI_Logo.png" alt="Logo" width={60} height={60} />
            <span className="ml-3">A Fuel Analysis Tool</span>
          </div>
        </Link>
      </div>

        <div>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/calculator">Calculator</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/fuelform">Fuel Form</Link>
          <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/quotehistory">Quote History</Link>
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