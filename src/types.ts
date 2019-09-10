interface IMeta {
  meta: boolean;
  text: string;
  parameters: {
    [parameter: string]: string | number;
  };
}

export interface IDictionary {
  [key: string]: string | IMeta | IDictionary;
}

export type ToGetters<TDictionary> = {
  [P in keyof TDictionary]: (
    TDictionary[P] extends string | IMeta ? string : ToGetters<TDictionary[P]>
    )
};

export type FlatPickOnlyMetaParameters<TObjectProp> = {
  meta:
    TObjectProp extends IMeta ? TObjectProp['parameters'] :
      TObjectProp extends string ? never : FlatPickOnlyMetaParameters<TObjectProp[keyof TObjectProp]>;
}[TObjectProp extends IMeta ? 'meta' : 'meta'];
