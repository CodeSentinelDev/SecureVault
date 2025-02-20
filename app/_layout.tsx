import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { generateAndStoreKey } from '@/utils/encryptionKey';

const RootLayout: React.FC = () => {
  useEffect(() => {
    generateAndStoreKey();
  }, []);

  return <Stack />;
};

export default RootLayout;
