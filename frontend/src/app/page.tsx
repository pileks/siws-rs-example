"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { SolanaSignInInput } from "@solana/wallet-standard-features";
import axios from "axios";
import WalletButton from "./_components/WalletButton";

export default function Home() {
  const { connected, signIn } = useWallet();

  const signMessage = async () => {
    if (!signIn) {
      console.error("Sign in requires a wallet connection!");
      return;
    }

    const input: SolanaSignInInput = {
      domain: "localhost:3000",
      statement: "Hello darkness my old friend",
      version: "1",
      nonce: "1337nonce",
      chainId: "mainnet",
      issuedAt: new Date().toISOString(),
      resources: [],
    };
    console.log("Sign in input:", input);

    const output = await signIn(input);
    console.log("Sign in output:", output);

    axios
      .post("http://localhost:8080/", {
        signature: Array.from(output.signature),
        signedMessage: Array.from(output.signedMessage),
        account: {
          publicKey: Array.from(output.account.publicKey),
        },
      })
      .then((x) => console.log(x.data))
      .catch((e) => console.error(e));
  };

  return (
    <main className="flex flex-col items-start gap-4">
      <WalletButton></WalletButton>
      <div>
        {connected ? (
          <button
            onClick={() => signMessage()}
            className="bg-white text-black cursor-pointer px-2 py-1 rounded-sm"
          >
            Sign In
          </button>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
