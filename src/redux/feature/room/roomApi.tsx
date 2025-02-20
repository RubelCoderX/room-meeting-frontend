import { baseApi } from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (room) => ({
        url: "/room/create-room",
        method: "POST",
        body: room,
      }),
      invalidatesTags: ["room"],
    }),
    getAllSlot: builder.query({
      query: () => {
        return {
          url: "/slot",
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
    getSlotById: builder.query({
      query: (slotId) => {
        return {
          url: `/slot/${slotId}`,
          method: "GET",
        };
      },
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
    deleteRoom: builder.mutation({
      query: (roomId) => {
        return {
          url: `/room/delete-room/${roomId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomQuery,
  useGetRoomByIdQuery,
  useGetAllSlotQuery,
  useGetSlotByIdQuery,
  useDeleteRoomMutation,
} = roomApi;
