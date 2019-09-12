import * as React from 'react';
import { IDictionary } from '../types';

export type ProviderComponentType = React.ComponentType<{}>;

export const createProvider = (dictionary: IDictionary): ProviderComponentType => {
  return () => <React.Fragment />;
};
