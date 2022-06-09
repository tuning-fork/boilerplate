import { QueryClient } from "react-query";

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default reactQueryClient
