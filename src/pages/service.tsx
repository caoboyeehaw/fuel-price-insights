import Navbar from '../components/Navbar';

export default function Service() {
  return (
    <div className="flex flex-col min-h-screen py-6 "> 
      <Navbar />
        <div className="mt-4 border-b-2 border-gray-200">
        </div>
        <div className="container mx-auto py-6">
          This is the service page that shows what we do as a mission; basically the about page
        </div>
    </div>
  );
};