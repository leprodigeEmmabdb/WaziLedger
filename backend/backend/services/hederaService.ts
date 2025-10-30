import { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType, TokenMintTransaction, ConsensusTopicCreateTransaction, TopicMessageSubmitTransaction } from "@hashgraph/sdk";
const operatorId = process.env.HEDERA_OPERATOR_ID!;
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY!);
const client = Client.forName("testnet"); client.setOperator(operatorId, operatorKey);

export async function createNftCollection(name: string, symbol: string, maxSupply = 1) {
  const tx = await new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(operatorId)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(maxSupply)
    .freezeWith(client);
  const sign = await tx.sign(operatorKey);
  const resp = await sign.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt.tokenId!.toString();
}

export async function mintNft(tokenId: string, metadataBuffers: Buffer[]) {
  const tx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata(metadataBuffers)
    .freezeWith(client);
  const signed = await tx.sign(operatorKey);
  const resp = await signed.execute(client);
  const receipt = await resp.getReceipt(client);
  return receipt;
}

export async function createTopic() {
  const tx = await new ConsensusTopicCreateTransaction().execute(client);
  const receipt = await tx.getReceipt(client);
  return receipt.topicId!.toString();
}

export async function submitProvenance(topicId: string, message: any) {
  const tx = await new TopicMessageSubmitTransaction({ topicId, message: JSON.stringify(message) }).execute(client);
  return tx.getReceipt(client);
}
