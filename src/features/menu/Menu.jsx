import React from 'react';
import { useMachine } from '@xstate/react';
import { fetchMachine } from './fetchMachine';
import styles from './Menu.module.css';

function Menu() {
  const [state, send] = useMachine(fetchMachine);

  const isLoading = state.value === 'loading';
  const isError = state.value === 'failure';

  const fetchData = (failure) => send('FETCH', { failure });
  const retryFetchData = () => send('RETRY');

  return (
    <div>
      <p className={styles.heading}>Menu</p>
      {isLoading ? (
        <label>Loading...</label>
      ) : (
        <section role="list">
          {state?.context.results.map(({ text }, index) => (
            <div role="listitem" key={index} className={styles.row}>
              <p>
                {index + 1}. {text}
              </p>
            </div>
          ))}
        </section>
      )}
      {isError && <p className={styles.error}>{state.context.message}</p>}
      <div className={styles.row}>
        <button
          role="button"
          disabled={isError}
          className={styles.button}
          onClick={() => fetchData(false)}
        >
          Load
          <span role="img" aria-label="success-emoji">
            ✅
          </span>
        </button>
        <button disabled={isError} className={styles.button} onClick={() => fetchData(true)}>
          Load
          <span role="img" aria-label="failure-emoji">
            ❌
          </span>
        </button>
        <button
          role="button"
          disabled={!isError}
          className={styles.button}
          onClick={retryFetchData}
        >
          Retry
          <span role="img" aria-label="retry-emoji">
            🔁
          </span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
