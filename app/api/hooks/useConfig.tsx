import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import PersonalWebsiteApi from "../api";
import type { ApiResponse } from "../type";
import { queryClient } from "~/providers/ReactQueryProvider";

const queryKeyMapping = {
  config: ["config"],
};

const getConfigQuery = {
  queryKey: queryKeyMapping.config,
  queryFn: () => PersonalWebsiteApi.getPersonalWebsiteConfig(),
};

export const useGetConfig = (): UseQueryResult<ApiResponse, Error> => {
  return useQuery<ApiResponse, Error>(getConfigQuery);
};

export const fetchConfig = () => {
  return queryClient.fetchQuery(getConfigQuery);
};
