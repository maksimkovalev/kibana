/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

// @ts-ignore formatNumber
import { formatNumber } from '@elastic/eui/lib/services/format';
import {
  EuiCallOut,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React from 'react';
import { i18n } from '@kbn/i18n';
import { Ping, HttpResponseBody } from '../../../../common/runtime_types';
import { DocLinkForBody } from './doc_link_body';
import { PingRedirects } from './ping_redirects';
import { PingHeaders } from './headers';

interface Props {
  ping: Ping;
}

const BodyDescription = ({ body }: { body: HttpResponseBody }) => {
  const contentBytes = body.content_bytes || 0;
  const bodyBytes = body.bytes || 0;

  const truncatedText =
    contentBytes > 0 && contentBytes < bodyBytes
      ? i18n.translate('xpack.synthetics.pingList.expandedRow.truncated', {
          defaultMessage: 'Showing first {contentBytes} bytes.',
          values: { contentBytes },
        })
      : null;
  const bodySizeText =
    bodyBytes > 0
      ? i18n.translate('xpack.synthetics.pingList.expandedRow.bodySize', {
          defaultMessage: 'Body size is {bodyBytes}.',
          values: { bodyBytes: formatNumber(bodyBytes, '0b') },
        })
      : null;
  const combinedText = [truncatedText, bodySizeText].filter((s) => s).join(' ');

  return <EuiText>{combinedText}</EuiText>;
};

const BodyExcerpt = ({ content }: { content: string }) =>
  content ? <EuiCodeBlock overflowHeight={250}>{content}</EuiCodeBlock> : null;

export const PingListExpandedRowComponent = ({ ping }: Props) => {
  const listItems = [];

  // Show the error block
  if (ping.error) {
    listItems.push({
      title: i18n.translate('xpack.synthetics.pingList.expandedRow.error', {
        defaultMessage: 'Error',
      }),
      description: <EuiText>{ping.error.message}</EuiText>,
    });
  }

  // Show the body, if present
  if (ping.http?.response?.body) {
    const body = ping.http.response.body;

    listItems.push({
      title: i18n.translate('xpack.synthetics.pingList.expandedRow.response_body', {
        defaultMessage: 'Response Body',
      }),
      description: (
        <>
          <BodyDescription body={body} />
          <EuiSpacer size={'s'} />
          {body.content ? <BodyExcerpt content={body.content || ''} /> : <DocLinkForBody />}
        </>
      ),
    });
  }
  return (
    <EuiFlexGroup direction="column">
      {ping?.http?.response?.redirects && (
        <EuiFlexItem>
          <PingRedirects monitorStatus={ping} showTitle={true} />
        </EuiFlexItem>
      )}
      {ping?.http?.response?.headers && (
        <EuiFlexItem>
          <PingHeaders headers={ping?.http?.response?.headers} />
        </EuiFlexItem>
      )}
      <EuiFlexItem>
        <EuiCallOut color={ping?.error ? 'danger' : 'primary'}>
          <EuiDescriptionList listItems={listItems} />
        </EuiCallOut>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
