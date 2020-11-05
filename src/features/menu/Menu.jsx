import React from 'react';
import { useMachine } from '@xstate/react';
import { fetchMachine } from './fetchMachine';
import styles from './Menu.module.css';

export const Menu = () => {
  const [state, send] = useMachine(fetchMachine);

  const isLoading = state.value === 'loading';
  const isError = state.value === 'failure';

  const fetchData = (endpoint) => send('FETCH', { endpoint });
  const retryFetchData = (endpoint) => send('RETRY', { endpoint });

  return (
    <div>
      <p className={styles.heading}>Menu</p>
      {isLoading ? (
        <label>Loading...</label>
      ) : (
        <section role="list">
          {!isError &&
            state?.context.result.teams.map(({ name, score }, index) => (
              <div role="listitem" key={index} className={styles.row}>
                <p>
                  {index + 1}. [{name}] - points: {score}
                </p>
              </div>
            ))}
        </section>
      )}
      {isError && <p className={styles.error}>{state.context.result.error.message}</p>}
      <div className={styles.row}>
        <button
          role="button"
          disabled={isError}
          className={styles.button}
          onClick={() => fetchData('teams')}
        >
          Load
          <span role="img" aria-label="success-emoji">
            ✅
          </span>
        </button>
        <button disabled={isError} className={styles.button} onClick={() => fetchData('invalid')}>
          Load
          <span role="img" aria-label="failure-emoji">
            ❌
          </span>
        </button>
        <button
          role="button"
          disabled={!isError}
          className={styles.button}
          onClick={() => retryFetchData('teams')}
        >
          Retry
          <span role="img" aria-label="retry-emoji">
            🔁
          </span>
        </button>
      </div>
    </div>
  );
};
