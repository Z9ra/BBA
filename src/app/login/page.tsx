'use client';

import { useActionState } from 'react';
import { login } from './actions';
import styles from './login.module.css';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>BBA<span className={styles.accent}>.</span> Admin</div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please sign in to access the dashboard</p>
        
        <form action={formAction} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Enter admin password"
              className={styles.input}
            />
          </div>
          
          {state?.error && <p className={styles.error}>{state.error}</p>}
          
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
