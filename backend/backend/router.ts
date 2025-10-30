import { Router } from "express";
import { uploadHandler, mintHandler, createTopicHandler, submitProvenanceHandler } from "./controllers/nftController";
const router = Router();

router.post("/upload", uploadHandler); // upload to IPFS
router.post("/mint", mintHandler);     // mint HTS NFT
router.post("/hcs/create", createTopicHandler); // create topic
router.post("/hcs/submit", submitProvenanceHandler); // submit message

export default router;
