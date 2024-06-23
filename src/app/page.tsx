import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Election for Students</h1>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/admin" legacyBehavior>
              <a className="text-blue-500 hover:underline">Admin Page</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/vote" legacyBehavior>
              <a className="text-blue-500 hover:underline">Vote</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/results" legacyBehavior>
              <a className="text-blue-500 hover:underline">Results</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
