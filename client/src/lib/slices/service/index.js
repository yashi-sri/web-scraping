import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, EndpointSlug } from "../../constant/endPoints";

export const Service = createApi({
  reducerPath: "Service",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Scrape"],
  endpoints: (builder) => ({
    createScrape: builder.mutation({
      query: (body) => ({
        url: `${EndpointSlug.CREATE_SCRAPE}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Scrape"],
    }),

    scrapeList: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${EndpointSlug.SCRAPE_LIST}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Scrape"],
    }),

    scrapeDetail: builder.query({
      query: (scrapeId) => ({
        url: `${EndpointSlug.SCRAPE_DETAIL}/${scrapeId}`,
        method: "GET",
      }),
    }),

    scrapeDelete: builder.mutation({
      query: (body) => ({
        url: `${EndpointSlug.SCRAPE_DELETE}`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateScrapeMutation,
  useScrapeListQuery,
  useLazyScrapeDetailQuery,
  useScrapeDeleteMutation,
} = Service;
