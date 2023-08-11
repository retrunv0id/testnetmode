import "./App.css";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../src/assets/abi.json";
import { modeTestnet } from "wagmi/chains";

function App() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0n);
  const { isConnected } = useAccount();

  const contractConfig = {
    address: "0x09D8cFfE58cc6a5d728BeEA0a7043AC5eAb4913E",
    abi: abi,
    enabled: true,
    chainId: modeTestnet.id,
  };

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "claimTokens",
    args: [],
    value: "50000000000000000",
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData);
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;

  return (
    <>
    
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <a
              style={{ margin: "4px auto" }}
              href={`https://twitter.com/Bullek7`}
              target="_blank"
              rel="noopener noreferrer"
            >
              My : Twitter
            </a>
        <img src="public/Bullek.jpg" width="200" height="200"
        style={{ margin: "12px auto" }}
        ></img>
        <ConnectButton showBalance={false} chainStatus="name" />
        {mintError && <p style={{ marginTop: 24 }}>Only 1 To Mint </p>}
        {txError && <p>Error: {txError.message}</p>}
        {mounted && isConnected && !isMinted && (
          <button
          
            className="button"
            style={{ marginTop: 15 }}
            disabled={!mint || isMintLoading || isMintStarted}
            data-mint-loading={isMintLoading}
            data-mint-started={isMintStarted}
            onClick={() => mint?.()}
          >
            {isMintLoading && "Waiting for approval"}
            {isMintStarted && "Minting..."}
            {!isMintLoading && !isMintStarted && "Mint"}
          </button>
        )}
        {isMinted && (
          <div>
            <h1 style={{ marginTop: 2 }}>
              good luck testing my token claim this is just a testnet this
              application I made just to make a web3 dapp for claim tokens on
              the TESTNET MODE network
            </h1>
            <a
              style={{ margin: "40px auto" }}
              href={`https://sepolia.explorer.mode.network/tx/${mintData?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            > BY:Bullek
              ModeTestnet 
            </a>
          </div>
        )}
      </header>
      <a>BY : Bullek</a>
    </>
  );
}

export default App;
