import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY?.trim();
const validPk = privateKey && /^0x[0-9a-fA-F]{64}$/.test(privateKey) ? privateKey : undefined;

const config: HardhatUserConfig & { defaultNetwork?: string } = {
  solidity: "0.8.17",
  defaultNetwork: "hedera",
  networks: {
    hedera: {
      url: "https://testnet.hashio.io/api",
      chainId: 296, // Hedera testnet EVM
      type: "http",
      // include accounts only when a valid PK is provided
      accounts: validPk ? [validPk] : undefined
    }
  }
};

export default config;
