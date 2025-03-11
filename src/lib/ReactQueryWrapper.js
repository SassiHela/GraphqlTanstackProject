"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryWrapper = ({ children }) => {
  // const [queryClient] = useState(() => new QueryClient());

  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryWrapper;
