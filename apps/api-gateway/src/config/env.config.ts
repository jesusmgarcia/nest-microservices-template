export const envConfig = () => ({
  environment: process.env.NODE_ENV,
  gatewayPort: process.env.GATEWAY_PORT,
  natsServers: process.env.NATS_SERVERS?.split(',').map((s) => s.trim()),
});
