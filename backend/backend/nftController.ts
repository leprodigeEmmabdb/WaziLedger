import { Request, Response } from "express";
import { uploadToIPFS } from "../services/ipfsService";
import { createNftCollection, mintNft, createTopic, submitProvenance } from "../services/hederaService";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

export const uploadHandler = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      // file buffer + metadata
      const file = req.file;
      const metadata = req.body;
      if (!file) return res.status(400).send({ error: "file missing" });
      const ipfsResult = await uploadToIPFS(file, metadata);
      return res.json(ipfsResult);
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  },
];

export const mintHandler = async (req: Request, res: Response) => {
  try {
    const { name, symbol, ipfsUri, maxSupply } = req.body;
    // create collection
    const tokenId = await createNftCollection(name, symbol, Number(maxSupply || 1));
    // mint metadata bytes (we store ipfsUri in metadata)
    const receipt = await mintNft(tokenId, [Buffer.from(ipfsUri)]);
    res.json({ tokenId, receipt });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};

export const createTopicHandler = async (req: Request, res: Response) => {
  try {
    const topicId = await createTopic();
    res.json({ topicId });
  } catch (err) { res.status(500).json({ error: String(err) }); }
};

export const submitProvenanceHandler = async (req: Request, res: Response) => {
  try {
    const { topicId, message } = req.body;
    const receipt = await submitProvenance(topicId, message);
    res.json({ receipt });
  } catch (err) { res.status(500).json({ error: String(err) }); }
};
