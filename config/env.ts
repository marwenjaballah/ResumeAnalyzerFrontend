export const env = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5207',
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api/resume/analyze-gemini',
    get fullUrl() {
      return `${this.url}${this.endpoint}`
    }
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Resume Analyzer',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI-Powered Resume Analysis Tool',
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@MarwenJaballah'
  }
} as const 