import { createConnection } from 'typeorm';

export default async function connect() {
  const connection = await createConnection();
  return connection;
}
