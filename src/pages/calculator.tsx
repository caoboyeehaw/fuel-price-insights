import Navbar from '../components/Navbar';

export default function calculator() {
  return (
    <div className="flex flex-col"> 
      <Navbar />
      <div className="flex justify-center h-screen">
        <div className="container mx-auto">
          This is the showcase page with the quick free-tier calculator
        </div>
      </div>
    </div>
  );
};