import { baseApi } from "@/redux/api/baseApi";

const meetingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (room) => ({
        url: "/room/create-room",
        method: "POST",
        body: room,
      }),
      invalidatesTags: ["room"],
    }),
    getAllRoom: builder.query({
      query: () => {
        return {
          url: "/room",
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
    getRoomById: builder.query({
      query: (roomId) => {
        return {
          url: `/room/get-room/${roomId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomQuery,
  useGetRoomByIdQuery,
} = meetingApi;
