import { onRequestOptions as __api_chat_ts_onRequestOptions } from "C:\\Users\\rosha\\Documents\\vampro-website\\functions\\api\\chat.ts"
import { onRequestPost as __api_chat_ts_onRequestPost } from "C:\\Users\\rosha\\Documents\\vampro-website\\functions\\api\\chat.ts"
import { onRequestPost as __api_lead_ts_onRequestPost } from "C:\\Users\\rosha\\Documents\\vampro-website\\functions\\api\\lead.ts"
import { onRequestGet as __api_waitlist_ts_onRequestGet } from "C:\\Users\\rosha\\Documents\\vampro-website\\functions\\api\\waitlist.ts"
import { onRequestPost as __api_waitlist_ts_onRequestPost } from "C:\\Users\\rosha\\Documents\\vampro-website\\functions\\api\\waitlist.ts"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_chat_ts_onRequestOptions],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_ts_onRequestPost],
    },
  {
      routePath: "/api/lead",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_lead_ts_onRequestPost],
    },
  {
      routePath: "/api/waitlist",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_waitlist_ts_onRequestGet],
    },
  {
      routePath: "/api/waitlist",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_waitlist_ts_onRequestPost],
    },
  ]