import { baseApi } from "@/redux/api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (room) => ({
        url: "/booking/create-booking",
        method: "POST",
        body: room,
      }),
      invalidatesTags: ["booking"],
    }),
    getAllBooking: builder.query({
      query: () => {
        return {
          url: "/booking",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    getBookingById: builder.query({
      query: (bookingId) => {
        return {
          url: `/booking/${bookingId}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    //    getMyBooking: builder.query({
    //   query: ({ page = 1, limit = 10 }) => {
    //     return {
    //       url: `/booking/my-bookings?page=${page}&limit=${limit}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    getMyBooking: builder.query({
      query: ({ page = 1, limit = 1 }) => {
        return {
          url: `/booking/my-bookings?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),

    deleteBooking: builder.mutation({
      query: (bookingId) => {
        return {
          url: `/booking/delete-booking/${bookingId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingQuery,
  useGetBookingByIdQuery,
  useDeleteBookingMutation,
  useGetMyBookingQuery,
} = BookingApi;
