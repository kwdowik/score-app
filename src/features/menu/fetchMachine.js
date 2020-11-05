import { Machine, assign } from 'xstate';
import { isEmpty, omit } from 'lodash/fp';
import { httpClient } from '../../utils/asyncUtils';

const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      result: {
        error: null,
        teams: [],
      },
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading',
        },
      },
      loading: {
        invoke: {
          src: 'fetchData',
          onDone: { target: 'success' },
          onError: { target: 'failure' },
        },
      },
      success: {
        entry: ['setResults'],
        on: {
          FETCH: 'loading',
        },
      },
      failure: {
        entry: ['setMessage'],
        on: {
          RETRY: 'loading',
        },
      },
    },
  },
  {
    services: {
      fetchData: async (ctx, event) => {
        const payload = omit('type', event);
        const resp = await httpClient.get(`http://localhost:8080/${event.endpoint}`, {
          params: !isEmpty(payload) && event.type === 'FETCH' ? payload : undefined,
        });
        return resp.data;
      },
    },
    actions: {
      setResults: assign((ctx, event) => ({
        result: {
          error: null,
          ...event.data,
        },
      })),
      setMessage: assign((ctx, event) => ({
        result: {
          error: event.data,
        },
      })),
    },
  }
);

export { fetchMachine };
