import { isBoolean } from 'lodash';

import { IMeta } from './definitions/lang';

export const concatParentWithCurrentKey = (key: string, parentKey: string) => {
  if (!parentKey) {
    return key;
  }

  return `${parentKey}.${key}`;
};

export const isMeta = (value: IMeta | unknown): value is IMeta => {
  return isBoolean((value as IMeta).meta);
};
