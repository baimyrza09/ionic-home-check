import UrqlClient from './client';
import { getSdk } from './sdk';

const client = new UrqlClient(process.env.VUE_APP_GRAPHQL_ENDPOINT!);

const sdk = getSdk(client);

export * from './sdk';
export default sdk;
