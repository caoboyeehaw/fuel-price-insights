import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
        <div className="mt-4 border-gray-200">
        </div>
        <div className="container mx-auto py-6">
          This is a test for group 15
        </div>
    </div>
  );
};