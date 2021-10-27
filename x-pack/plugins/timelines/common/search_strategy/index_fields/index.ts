/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { IFieldSubType } from '@kbn/es-query';
import type { MappingRuntimeFields } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import type {
  IEsSearchRequest,
  IEsSearchResponse,
  IIndexPattern,
} from '../../../../../../src/plugins/data/common';
import type { DocValueFields, Maybe } from '../common';

export type BeatFieldsFactoryQueryType = 'beatFields';

export interface FieldInfo {
  category: string;
  description?: string;
  example?: string | number;
  format?: string;
  name: string;
  type?: string;
}

export interface IndexField {
  /** Where the field belong */
  category: string;
  /** Example of field's value */
  example?: Maybe<string | number>;
  /** whether the field's belong to an alias index */
  indexes: Array<Maybe<string>>;
  /** The name of the field */
  name: string;
  /** The type of the field's values as recognized by Kibana */
  type: string;
  /** Whether the field's values can be efficiently searched for */
  searchable: boolean;
  /** Whether the field's values can be aggregated */
  aggregatable: boolean;
  /** Description of the field */
  description?: Maybe<string>;
  format?: Maybe<string>;
  /** the elastic type as mapped in the index */
  esTypes?: string[];
  subType?: IFieldSubType;
  readFromDocValues: boolean;
}

export type BeatFields = Record<string, FieldInfo>;

export interface IndexFieldsStrategyRequestByIndices extends IEsSearchRequest {
  indices: string[];
  onlyCheckIfIndicesExist: boolean;
}
export interface IndexFieldsStrategyRequestById extends IEsSearchRequest {
  dataViewId: string;
  onlyCheckIfIndicesExist: boolean;
}

export type IndexFieldsStrategyRequest<T extends 'indices' | 'dataView'> = T extends 'dataView'
  ? IndexFieldsStrategyRequestById
  : IndexFieldsStrategyRequestByIndices;

export interface IndexFieldsStrategyResponse extends IEsSearchResponse {
  indexFields: IndexField[];
  indicesExist: string[];
  runtimeMappings: MappingRuntimeFields;
}

export interface BrowserField {
  aggregatable: boolean;
  category: string;
  description: string | null;
  example: string | number | null;
  fields: Readonly<Record<string, Partial<BrowserField>>>;
  format: string;
  indexes: string[];
  name: string;
  searchable: boolean;
  type: string;
  subType?: IFieldSubType;
}

export type BrowserFields = Readonly<Record<string, Partial<BrowserField>>>;

export const EMPTY_BROWSER_FIELDS = {};
export const EMPTY_DOCVALUE_FIELD: DocValueFields[] = [];
export const EMPTY_INDEX_PATTERN: IIndexPattern = {
  fields: [],
  title: '',
};
