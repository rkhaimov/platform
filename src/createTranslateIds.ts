import { ToGetters } from './types';

export const createTranslateIds = <TDictionary extends unknown>(dictionary: TDictionary): ToGetters<TDictionary> => {
  return dictionary as ToGetters<TDictionary>;
};
