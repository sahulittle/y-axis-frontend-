import { request } from "../../lib/axios/client";

export const listUsers = (params) => {
  return request({
    url: "/admin/users",
    method: "GET",
    params,
  });
};

export const updateUser = (userId, payload) => {
  return request({
    url: `/admin/users/${userId}`,
    method: "PATCH",
    data: payload,
  });
};

export const deleteUser = (userId) => {
  return request({
    url: `/admin/users/${userId}`,
    method: "DELETE",
  });
};
