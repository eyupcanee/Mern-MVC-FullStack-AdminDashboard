import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Performance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getLastUser: builder.query({
      query: () => "general/users/last",
    }),
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: builder.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: builder.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getUserPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  //useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetLastUserQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;

export const getUser = (id) => axios.get(`${baseUrl}general/user/${id}`);

export const getLastUser = async () =>
  axios.get(`${baseUrl}general/users/last`);

export const insertUser = (user) =>
  axios.post(`${baseUrl}general/user/insert`, user);

export const loginUser = (user) =>
  axios.post(`${baseUrl}general/user/login`, user);

export const deleteUser = (id, token) =>
  axios.delete(`${baseUrl}general/user/${id}/${token}`);

export const deleteProduct = (id, token) =>
  axios.delete(`${baseUrl}client/product/${id}/${token}`);

export const getProducts = () => axios.get(`${baseUrl}client/products`);

export const insertProduct = (product) =>
  axios.post(`${baseUrl}general/product/insert`, product);

export const getCustomers = () => axios.get(`${baseUrl}client/customers`);

export const getAdmins = () => axios.get(`${baseUrl}management/admins`);

export const deleteAdmin = (id, token) =>
  axios.delete(`${baseUrl}management/admin/${id}/${token}`);
