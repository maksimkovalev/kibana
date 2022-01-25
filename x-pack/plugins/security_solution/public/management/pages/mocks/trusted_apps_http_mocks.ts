/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HttpFetchOptionsWithPath } from 'kibana/public';
import {
  ENDPOINT_TRUSTED_APPS_LIST_ID,
  EXCEPTION_LIST_ITEM_URL,
  EXCEPTION_LIST_URL,
} from '@kbn/securitysolution-list-constants';
import {
  ExceptionListItemSchema,
  FoundExceptionListItemSchema,
  FindExceptionListItemSchema,
  UpdateExceptionListItemSchema,
  ReadExceptionListItemSchema,
  CreateExceptionListItemSchema,
  ExceptionListSchema,
} from '@kbn/securitysolution-io-ts-list-types';
import {
  composeHttpHandlerMocks,
  httpHandlerMockFactory,
  ResponseProvidersInterface,
} from '../../../common/mock/endpoint/http_handler_mock_factory';
import { ExceptionsListItemGenerator } from '../../../../common/endpoint/data_generators/exceptions_list_item_generator';
import { getTrustedAppsListSchemaMock } from '../../../../../lists/common/schemas/response/exception_list_schema.mock';
import {
  fleetGetAgentPolicyListHttpMock,
  FleetGetAgentPolicyListHttpMockInterface,
  fleetGetEndpointPackagePolicyListHttpMock,
  FleetGetEndpointPackagePolicyListHttpMockInterface,
} from './fleet_mocks';
import { BY_POLICY_ARTIFACT_TAG_PREFIX } from '../../../../common/endpoint/service/artifacts/constants';

interface FindExceptionListItemSchemaQueryParams
  extends Omit<FindExceptionListItemSchema, 'page' | 'per_page'> {
  page?: number;
  per_page?: number;
}

export type TrustedAppsGetListHttpMocksInterface = ResponseProvidersInterface<{
  trustedAppsList: (options: HttpFetchOptionsWithPath) => FoundExceptionListItemSchema;
}>;
/**
 * HTTP mock for retrieving list of Trusted Apps
 */
export const trustedAppsGetListHttpMocks =
  httpHandlerMockFactory<TrustedAppsGetListHttpMocksInterface>([
    {
      id: 'trustedAppsList',
      path: `${EXCEPTION_LIST_ITEM_URL}/_find`,
      method: 'get',
      handler: ({ query }): FoundExceptionListItemSchema => {
        const apiQueryParams = query as unknown as FindExceptionListItemSchemaQueryParams;
        const generator = new ExceptionsListItemGenerator('seed');
        const perPage = apiQueryParams.per_page ?? 10;
        const data = Array.from({ length: Math.min(perPage, 50) }, () =>
          generator.generate({ list_id: ENDPOINT_TRUSTED_APPS_LIST_ID, os_types: ['windows'] })
        );

        // FIXME: remove hard-coded IDs below adn get them from the new FleetPackagePolicyGenerator (#2262)

        // Change the 3rd entry (index 2) to be policy specific
        data[2].tags = [
          // IDs below are those generated by the `fleetGetEndpointPackagePolicyListHttpMock()` mock,
          // so if using in combination with that API mock, these should just "work"
          `${BY_POLICY_ARTIFACT_TAG_PREFIX}ddf6570b-9175-4a6d-b288-61a09771c647`,
          `${BY_POLICY_ARTIFACT_TAG_PREFIX}b8e616ae-44fc-4be7-846c-ce8fa5c082dd`,
        ];

        return {
          page: apiQueryParams.page ?? 1,
          per_page: perPage,
          total: 20,
          data,
        };
      },
    },
  ]);

export type TrustedAppPutHttpMocksInterface = ResponseProvidersInterface<{
  trustedAppUpdate: (options: HttpFetchOptionsWithPath) => ExceptionListItemSchema;
}>;
/**
 * HTTP mocks that support updating a single Trusted Apps
 */
export const trustedAppPutHttpMocks = httpHandlerMockFactory<TrustedAppPutHttpMocksInterface>([
  {
    id: 'trustedAppUpdate',
    path: EXCEPTION_LIST_ITEM_URL,
    method: 'put',
    handler: ({ body, path }): ExceptionListItemSchema => {
      const updatedExceptionItem = JSON.parse(
        body as string
      ) as Required<UpdateExceptionListItemSchema>;
      const response: ExceptionListItemSchema = {
        ...updatedExceptionItem,
        id: path.split('/').pop() ?? 'unknown-id',
        comments: [],
        created_at: '2021-10-12T16:02:55.856Z',
        created_by: 'elastic',
        updated_at: '2021-10-13T16:02:55.856Z',
        updated_by: 'elastic',
        list_id: ENDPOINT_TRUSTED_APPS_LIST_ID,
        _version: 'abc',
        tie_breaker_id: '1111',
      };

      return response;
    },
  },
]);

export type TrustedAppsGetOneHttpMocksInterface = ResponseProvidersInterface<{
  trustedApp: (options: HttpFetchOptionsWithPath) => ExceptionListItemSchema;
}>;
/**
 * HTTP mock for retrieving list of Trusted Apps
 */
export const trustedAppsGetOneHttpMocks =
  httpHandlerMockFactory<TrustedAppsGetOneHttpMocksInterface>([
    {
      id: 'trustedApp',
      path: EXCEPTION_LIST_ITEM_URL,
      method: 'get',
      handler: ({ query }): ExceptionListItemSchema => {
        const apiQueryParams = query as ReadExceptionListItemSchema;
        const exceptionItem = new ExceptionsListItemGenerator('seed').generate({
          os_types: ['windows'],
        });

        exceptionItem.item_id = apiQueryParams.item_id ?? exceptionItem.item_id;
        exceptionItem.namespace_type =
          apiQueryParams.namespace_type ?? exceptionItem.namespace_type;

        return exceptionItem;
      },
    },
  ]);

export type TrustedAppPostHttpMocksInterface = ResponseProvidersInterface<{
  trustedAppCreate: (options: HttpFetchOptionsWithPath) => ExceptionListItemSchema;
}>;
/**
 * HTTP mocks that support updating a single Trusted Apps
 */
export const trustedAppPostHttpMocks = httpHandlerMockFactory<TrustedAppPostHttpMocksInterface>([
  {
    id: 'trustedAppCreate',
    path: EXCEPTION_LIST_ITEM_URL,
    method: 'post',
    handler: ({ body, path }): ExceptionListItemSchema => {
      const { comments, ...updatedExceptionItem } = JSON.parse(
        body as string
      ) as CreateExceptionListItemSchema;
      const response: ExceptionListItemSchema = {
        ...new ExceptionsListItemGenerator('seed').generate({ os_types: ['windows'] }),
        ...updatedExceptionItem,
      };
      response.id = path.split('/').pop() ?? response.id;

      return response;
    },
  },
]);

export type TrustedAppsPostCreateListHttpMockInterface = ResponseProvidersInterface<{
  trustedAppCreateList: (options: HttpFetchOptionsWithPath) => ExceptionListSchema;
}>;
/**
 * HTTP mocks that support updating a single Trusted Apps
 */
export const trustedAppsPostCreateListHttpMock =
  httpHandlerMockFactory<TrustedAppsPostCreateListHttpMockInterface>([
    {
      id: 'trustedAppCreateList',
      path: EXCEPTION_LIST_URL,
      method: 'post',
      handler: (): ExceptionListSchema => {
        return getTrustedAppsListSchemaMock();
      },
    },
  ]);

export type TrustedAppsAllHttpMocksInterface = FleetGetEndpointPackagePolicyListHttpMockInterface &
  FleetGetAgentPolicyListHttpMockInterface &
  TrustedAppsGetListHttpMocksInterface &
  TrustedAppsGetOneHttpMocksInterface &
  TrustedAppPutHttpMocksInterface &
  TrustedAppPostHttpMocksInterface &
  TrustedAppsPostCreateListHttpMockInterface;
/** Use this HTTP mock when wanting to mock the API calls done by the Trusted Apps Http service */
export const trustedAppsAllHttpMocks = composeHttpHandlerMocks<TrustedAppsAllHttpMocksInterface>([
  trustedAppsGetListHttpMocks,
  trustedAppsGetOneHttpMocks,
  trustedAppPutHttpMocks,
  trustedAppPostHttpMocks,
  trustedAppsPostCreateListHttpMock,
  fleetGetEndpointPackagePolicyListHttpMock,
  fleetGetAgentPolicyListHttpMock,
]);
