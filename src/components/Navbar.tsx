import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto pt-3 bg-gradient-to-b from-white to-white/0 bg-opacity-100"> 
        <div className="flex justify-center items-center">
          <nav className="flex justify-between items-center w-full">
            <div>
              <Link href="/">
                <div className="text-xl text-green-700 flex items-center">
                  <Image src="/FPI_Logo.png" alt="Logo" width={50} height={50} />
                  <div className="ml-5 flex flex-nowrap">
                    <p className="mr-1">A Fuel</p>
                    <p className="font-bold mr-1">Analysis</p>
                    <p>Tool</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/calculator">Calculator</Link>
              <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/fuelform">Fuel Form</Link>
              <Link className="text-md rounded-lg px-4 py-2 text-slate-500 hover:text-black" href="/quotehistory">Quote History</Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link className="text-md flex items-center rounded-md px-4 py-1 bg-blue-700 hover:bg-blue-800 text-white" href="/login">
                <span className="mx-auto">Log In</span>
              </Link>
              <Link className="text-md flex items-center rounded-md hover:shadow-none px-4 py-1 bg-green-700 hover:bg-green-800 text-white" href="/signup">
                <span className="mx-auto">Sign Up</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
