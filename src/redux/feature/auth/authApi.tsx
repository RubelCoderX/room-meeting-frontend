import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getMe: builder.query({
      query: () => {
        return {
          url: "/user/profile",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = authApi;
