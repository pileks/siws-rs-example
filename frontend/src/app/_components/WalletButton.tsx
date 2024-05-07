"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

// We are wrapping the WalletMultiButton from @solana/wallet-adapter-react-ui, as it's causing hydration errors
export default function WalletButton() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return <>{domLoaded ? <WalletMultiButton></WalletMultiButton> : <></>}</>;
}
