import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/signin">Login</Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;