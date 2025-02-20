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
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllSlotQuery,
  useGetSlotByIdQuery,
} = roomApi;
