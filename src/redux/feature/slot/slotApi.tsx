import { baseApi } from "@/redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (room) => ({
        url: "/slot/create-slot",
        method: "POST",
        body: room,
      }),
      invalidatesTags: ["slot"],
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
  useCreateSlotMutation,
  useGetAllSlotQuery,
  useGetSlotByIdQuery,
} = slotApi;
