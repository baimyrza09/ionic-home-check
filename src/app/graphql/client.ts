import session from '@/app/providers/session';
import { GraphQLClient, Variables } from 'graphql-request';
import { HEADERS } from '@/app/providers/session/SessionProvider';
import { Client, createClient, dedupExchange, fetchExchange, RequestPolicy, subscriptionExchange } from '@urql/core';
import { createClient as createWSClient } from 'graphql-ws';
import { convertObjectDates } from '@/shared/lib/date';
export default class UrqlClient extends GraphQLClient {
  private readonly client: Client;
  constructor(url: string) {
    super(url);
    const wsClient = createWSClient({
      url: url.replace('https://', 'wss://').replace('graphql', 'subscriptions'),
    });
    this.client = createClient({
      url,
      fetch: async (...args) => {
        const response = await fetch(...args);
        const sessionExpires = response.headers.get(HEADERS.SESSION_EXPIRES_AT);
        session.setUserSessionExpires(sessionExpires);
        return response;
      },
      fetchOptions: { credentials: 'include' },
      exchanges: [
        dedupExchange,
        fetchExchange,
        subscriptionExchange({
          forwardSubscription: (operation) => ({
            subscribe: (sink) => ({
              unsubscribe: wsClient.subscribe(operation, sink),
            }),
          }),
        }),
      ],
    });
  }

  public async request<T = any, V = Variables>(document: any, variables?: V): Promise<T> {
    const requestPolicy: string | null = 'network-only';

    const convertedDatesVariables = variables ? convertObjectDates(variables!, 'iso') : variables;

    // TODO: найти способ без ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (document.definitions[0]?.operation === 'mutation') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await this.client.mutation<T>(document, convertedDatesVariables).toPromise();
      if (result.error) throw result.error;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return convertObjectDates<T>(result.data!, 'standard');
    }

    // TODO: найти способ без ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (document.definitions[0]?.operation === 'subscription') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.client.subscription(document, variables);
    }

    const result = await this.client
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .query<T>(document, variables, {
        requestPolicy: requestPolicy as RequestPolicy,
      })
      .toPromise();
    if (result.error) throw result.error;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return convertObjectDates<T>(result.data!, 'standard');
  }
}
