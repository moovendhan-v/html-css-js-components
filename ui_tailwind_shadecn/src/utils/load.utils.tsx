
import {Env} from '@/types/env'

export const getEnvVariable = <K extends keyof Env>(name: K): Env[K] => {
  const value = process.env[name];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value as Env[K];
};
