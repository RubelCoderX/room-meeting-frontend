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
      query: ({ searchTerm, capacity }) => {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (capacity) queryParams.append("capacity", capacity);

        return {
          url: `/room?${queryParams.toString()}`,
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
    updateRoom: builder.mutation({
      query: (room) => {
        return {
          url: `/room/update-room/${room.roomId}`,
          method: "PATCH",
          body: room,
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
  useUpdateRoomMutation,
} = roomApi;
