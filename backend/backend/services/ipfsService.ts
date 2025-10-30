import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY || "" });

export async function uploadToIPFS(file: Express.Multer.File, metadata: any) {
  const nfFile = new File([file.buffer], file.originalname, { type: file.mimetype });
  const store = await client.store({
    image: nfFile,
    name: metadata.name || file.originalname,
    description: metadata.description || "",
    properties: metadata.properties ? JSON.parse(metadata.properties) : {}
  });
  // store.url or store.data.image.href
  return store;
}
