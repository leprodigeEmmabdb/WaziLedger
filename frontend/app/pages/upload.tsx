import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("choose file");
    setStatus("uploading to IPFS...");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", name);
    fd.append("description", desc);

    const res = await axios.post("http://localhost:4000/api/upload", fd, { headers: { "Content-Type": "multipart/form-data" }});
    const cid = (res.data as any).ipnft || res.data.data?.image?.href;
    setStatus("minting NFT...");
    const mint = await axios.post("http://localhost:4000/api/mint", { name, symbol: "WAZI", ipfsUri: cid, maxSupply: 1});
    setStatus("done: " + JSON.stringify(mint.data));
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Upload & Mint</h2>
      <form onSubmit={submit}>
        <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        </div>
        <div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        </div>
        <button type="submit">Upload + Mint</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
