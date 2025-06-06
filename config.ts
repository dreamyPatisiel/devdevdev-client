export const baseUrlConfig = {
  serviceUrl: process.env.NEXT_PUBLIC_SERVICE_URL,
};

export const loginConfig = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  endPoint: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_ENDPOINT,
};

export const slackConfig = {
  webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_API_URL,
};
