import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>WaziLedger</h1>
      <nav>
        <ul>
          <li><Link href="/upload">Upload & Mint</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    </main>
  );
}
