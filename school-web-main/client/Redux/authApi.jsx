import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const devUrl="http://localhost:5173/api/"
const devUrl="http://localhost:4000/api/"


export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: devUrl,
  }),
//   tagTypes: ["Posts"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials:"include"

      }),
    //   invalidatesTags: ["Posts"],
    }),
    loadUser: builder.query({
      query: (credentials) => ({
        url: "me",
        method: "GET",
        body: credentials,
        credentials:"include"

      }),
    //   invalidatesTags: ["Posts"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials:"include"
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
        credentials:"include"

      }),
    //   invalidatesTags: ["Posts"],
    }),
    enroll: builder.mutation({
      query: (data) => ({
        url: "enroll",
        method: "POST",
        body: data,
      }),
    //   invalidatesTags: ["Posts"],
    }), 
  
    query: builder.mutation({
      query: (data) => ({
        url: "query",
        method: "POST",
        body: data,
      }),
    //   invalidatesTags: ["Posts"],
    }),
    
    parentsenroll: builder.mutation({
      query: (credentials) => ({
        url: "parentsEnroll",
        method: "POST",
        body: credentials,
      }),
    //   invalidatesTags: ["Posts"],
    }),
    admissionQuery: builder.mutation({
      query: (data) => ({
        url: "admissionquery",
        method: "POST",
        body: data,
      }),
    //   invalidatesTags: ["Posts"],
    }),
    schedule: builder.mutation({
      query: (data) => ({
        url: "schedule",
        method: "POST",
        body: data,
      }),
    //   invalidatesTags: ["Posts"],
    }),

    newsUsers: builder.query({
      query: () => ({
        url: "news",
        method: "GET",
      }),
    //   invalidatesTags: ["Posts"],
    }),

 
    eventsUsers: builder.query({
      query: () => ({
        url: "events",
        method: "GET",
      }),
    //   invalidatesTags: ["Posts"],
    }),

    udpatePassword:builder.mutation({
      query: (credentials) => ({
        url: "updatePassword",
        method: "PUT",
        body: credentials,
        credentials:"include"

      }),
    }),
    udpateProfilePic:builder.mutation({
      query: (data) => ({
        url: "updateProfilePic",
        method: "PUT",
        body: data,
        credentials:"include"

      }),
    }),
    resetPasswordMail:builder.mutation({
      query: (email) => ({
        url: "forgotPassword",
        method: "PUT",
        body: email,
        credentials:"include"

      }),
    }),
    resetPassword:builder.mutation({
      query: (data) => ({
        url: `resetPassword/${data?.token}`,
        method: "PUT",
        credentials:"include",
        body:{password:data?.password,confirmPassword:data?.confirmPassword}

      }),
    }),
    singleGallery:builder.query({
      query:(id)=>({
        url: `user/gallery/${id}`,
        method: "GET",
       
      })
    })

    
 
 

  
  }),
  
});

export const {
useLoginMutation,
useLogoutMutation,
useRegisterMutation,
useEnrollMutation,
useQueryMutation,
useParentsenrollMutation,
useAdmissionQueryMutation,
useScheduleMutation,
useEventsUsersQuery,
useNewsUsersQuery,
useLoadUserQuery,
useUdpatePasswordMutation,
useUdpateProfilePicMutation,
useResetPasswordMailMutation,
useResetPasswordMutation,
useSingleGalleryQuery

} = myApi;