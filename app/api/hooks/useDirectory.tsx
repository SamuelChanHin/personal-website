import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import PersonalWebsiteApi from "../api";
import type { ApiResponse } from "../type";
import { queryClient } from "~/providers/ReactQueryProvider";

const queryKeyMapping = {
  directory: ["directory"],
};

const getConfigQuery = {
  queryKey: queryKeyMapping.directory,
  queryFn: () => PersonalWebsiteApi.getPersonalWebsiteDirectory(),
};

export const useGetDirectory = (): UseQueryResult<ApiResponse, Error> => {
  return useQuery<ApiResponse, Error>(getConfigQuery);
};

export const fetchDirectory = () => {
  return queryClient.fetchQuery(getConfigQuery);
};
