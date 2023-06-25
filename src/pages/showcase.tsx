import Navbar from '../components/Navbar';

export default function Showcase() {
  return (
    <div className="flex flex-col min-h-screen py-6 "> 
      <Navbar />
        <div className="mt-4 border-b-2 border-gray-200">
        </div>
        <div className="container mx-auto py-6">
          This is the showcase page with the quick free-tier calculator
        </div>
    </div>
  );
};