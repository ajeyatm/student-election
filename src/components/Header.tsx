// src/components/Header.tsx

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Student Election</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/admin" legacyBehavior>
              <a className="hover:underline">Admin Page</a>
            </Link>
          </li>
          <li>
            <Link href="/vote" legacyBehavior>
              <a className="hover:underline">Vote</a>
            </Link>
          </li>
          <li>
            <Link href="/results" legacyBehavior>
              <a className="hover:underline">Results</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
