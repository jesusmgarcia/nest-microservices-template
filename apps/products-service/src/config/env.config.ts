export const envConfig = () => ({
  environment: process.env.NODE_ENV,
  natsServers: process.env.NATS_SERVERS?.split(',').map((s) => s.trim()),
});
