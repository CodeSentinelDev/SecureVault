import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  /** 🔹 Ensure the component is fully mounted before redirection */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** 🔹 Redirect to the login screen after mounting */
  useEffect(() => {
    if (isMounted) {
      router.replace('/login/login');
    }
  }, [isMounted, router]);

  return null; // 🚀 No UI needed, as this is a redirect-only component
};

export default Index;
