import Navbar from '../components/Navbar';

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen py-6 "> 
      <Navbar />
        <div className="mt-4 border-b-2 border-gray-200">
        </div>
        <div className="container mx-auto py-6">
          This is the pricing page with all the pricings involved (probably an infographic of some sorts)
        </div>
    </div>
  );
};