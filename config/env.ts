export const env = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL ,
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT ,
    get fullUrl() {
      return `${this.url}${this.endpoint}`
    }
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ,
    name: process.env.NEXT_PUBLIC_SITE_NAME ,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ,
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE 
  }
} as const 