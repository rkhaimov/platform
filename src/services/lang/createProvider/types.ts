import { FlatPickOnlyMetaParameters, IDictionary } from '../definitions/lang';

export type ProviderComponentType = import('react').ComponentType<{}>;

export interface IWithLangProvidedProps {
  waiting: boolean;
  lang: string;
  dictionary: IFlatDictionary;
  changeLang(lang: string): void;
}

export interface IIntlInjectProvidedProps<TDictionary> {
  intl: import('react-intl').IntlShape;
  translate(id: string, values?: FlatPickOnlyMetaParameters<TDictionary>): string;
}

export type CreateWithTranslationProvidedProps<TDictionary> = IWithLangProvidedProps & IIntlInjectProvidedProps<TDictionary>;

export type WithTranslationHOCType<TDictionary> =
    <TProps, TOwnProps = Omit<TProps, keyof CreateWithTranslationProvidedProps<unknown>>>(
      WrappedComponent: import('react').ComponentType<TProps>,
    ) => import('react').ComponentType<TOwnProps>;

export interface IDictionarySource {
  getDictionary(project: string, lang: string): Promise<IDictionary>;
  uploadBaseDictionary(project: string, lang: string, dictionary: IDictionary): Promise<void>;
}

export interface IFileExplorer {
  findDictionaryByPath(path: string): IDictionary;
}

export interface IFlatDictionary { [key: string]: string; }
