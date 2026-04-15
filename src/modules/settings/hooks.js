import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSettings, patchSettings, uploadSiteAsset } from "./api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useSettingsQuery = (params) => {
  return useQuery({
    queryKey: queryKeys.settings.list(params),
    queryFn: () => listSettings(params),
  });
};

export const usePatchSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => patchSettings(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.settings.all }),
  });
};

export const useUploadSiteAssetMutation = () => {
  return useMutation({
    mutationFn: (payload) => uploadSiteAsset(payload),
  });
};
