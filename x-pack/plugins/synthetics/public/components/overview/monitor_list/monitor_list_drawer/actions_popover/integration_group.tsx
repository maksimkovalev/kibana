/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { useContext } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import { IntegrationLink } from './integration_link';
import {
  getLegacyApmHref,
  getInfraContainerHref,
  getInfraIpHref,
  getInfraKubernetesHref,
  getLoggingContainerHref,
  getLoggingIpHref,
  getLoggingKubernetesHref,
} from '../../../../../lib/helper';
import { MonitorSummary } from '../../../../../../common/runtime_types';
import { UptimeSettingsContext } from '../../../../../contexts';

interface IntegrationGroupProps {
  summary: MonitorSummary;
}

export const extractSummaryValues = (summary: Pick<MonitorSummary, 'state'>) => {
  const domain = summary.state.url?.domain ?? '';

  const firstCheck = summary.state.summaryPings?.[0];

  const podUid = firstCheck?.kubernetes?.pod?.uid ?? undefined;
  const containerId = firstCheck?.container?.id ?? undefined;
  const ip = firstCheck?.monitor.ip ?? undefined;

  return {
    domain,
    podUid,
    containerId,
    ip,
  };
};

export const IntegrationGroup = ({ summary }: IntegrationGroupProps) => {
  const {
    basePath,
    dateRangeStart,
    dateRangeEnd,
    isApmAvailable,
    isInfraAvailable,
    isLogsAvailable,
  } = useContext(UptimeSettingsContext);

  const { domain, podUid, containerId, ip } = extractSummaryValues(summary);

  return isApmAvailable || isInfraAvailable || isLogsAvailable ? (
    <EuiFlexGroup direction="column">
      {isApmAvailable ? (
        <EuiFlexItem>
          <IntegrationLink
            ariaLabel={i18n.translate('xpack.synthetics.apmIntegrationAction.description', {
              defaultMessage: 'Search APM for this monitor',
              description:
                'This value is shown to users when they hover over an icon that will take them to the APM app.',
            })}
            href={getLegacyApmHref(summary, basePath, dateRangeStart, dateRangeEnd)}
            iconType="apmApp"
            message={i18n.translate('xpack.synthetics.apmIntegrationAction.text', {
              defaultMessage: 'Show APM Data',
              description:
                'A message explaining that when the user clicks the associated link, it will navigate to the APM app',
            })}
            tooltipContent={i18n.translate(
              'xpack.synthetics.monitorList.observabilityIntegrationsColumn.apmIntegrationLink.tooltip',
              {
                defaultMessage:
                  'Click here to check APM for the domain "{domain}" or explicitly defined "service name".',
                description:
                  'A messsage shown in a tooltip explaining that the nested anchor tag will navigate to the APM app and search for the given URL domain or explicitly defined service name.',
                values: {
                  domain,
                },
              }
            )}
          />
        </EuiFlexItem>
      ) : null}
      {isInfraAvailable ? (
        <React.Fragment>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.ip.ariaLabel',
                {
                  defaultMessage: `Check Infrastructure UI for this montor's ip address`,
                  description: 'This value is shown as the aria label value for screen readers.',
                }
              )}
              href={getInfraIpHref(summary, basePath)}
              iconType="metricsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.ip.message',
                {
                  defaultMessage: 'Show host metrics',
                  description: `A message explaining that this link will take the user to the Infrastructure UI, filtered for this monitor's IP Address`,
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.ip.tooltip',
                {
                  defaultMessage: 'Check Infrastructure UI for the IP "{ip}"',
                  values: {
                    ip: Array.isArray(ip) ? ip[0] : ip,
                  },
                }
              )}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.kubernetes.description',
                {
                  defaultMessage: `Check Infrastructure UI for this monitor's pod UID`,
                  description: 'This value is shown as the aria label value for screen readers.',
                }
              )}
              href={getInfraKubernetesHref(summary, basePath)}
              iconType="metricsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.kubernetes.message',
                {
                  defaultMessage: 'Show pod metrics',
                  description:
                    'A message explaining that this link will take the user to the Infrastructure UI filtered for the monitor Pod UID.',
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.kubernetes.tooltip',
                {
                  defaultMessage: 'Check Infrastructure UI for pod UID "{podUid}".',
                  values: {
                    podUid,
                  },
                }
              )}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.docker.description',
                {
                  defaultMessage: `Check Infrastructure UI for this monitor's container ID`,
                }
              )}
              href={getInfraContainerHref(summary, basePath)}
              iconType="metricsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.container.message',
                {
                  defaultMessage: 'Show container metrics',
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.infraIntegrationAction.docker.tooltip',
                {
                  defaultMessage: 'Check Infrastructure UI for container ID "{containerId}"',
                  values: {
                    containerId,
                  },
                }
              )}
            />
          </EuiFlexItem>
        </React.Fragment>
      ) : null}
      {isLogsAvailable ? (
        <React.Fragment>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.ip.description',
                {
                  defaultMessage: `Check Logging UI for this monitor's ip address`,
                  description: 'This value is shown as the aria label for screen readers.',
                }
              )}
              href={getLoggingIpHref(summary, basePath)}
              iconType="logsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.ip.message',
                {
                  defaultMessage: 'Show host logs',
                  description: `A message explaining that this link will take the user to the Infrastructure UI filtered for the monitor's IP Address`,
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.ip.tooltip',
                {
                  defaultMessage: 'Check Logging UI for the IP "{ip}"',
                  values: {
                    ip: Array.isArray(ip) ? ip[0] : ip,
                  },
                }
              )}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.kubernetes.ariaLabel',
                {
                  defaultMessage: 'Show pod logs',
                }
              )}
              href={getLoggingKubernetesHref(summary, basePath)}
              iconType="logsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.kubernetes.message',
                {
                  defaultMessage: 'Show pod logs',
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.kubernetes.tooltip',
                {
                  defaultMessage: 'Check for logs for pod UID "{podUid}"',
                  values: {
                    podUid,
                  },
                }
              )}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <IntegrationLink
              ariaLabel={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.container.id',
                {
                  defaultMessage: 'Show container logs',
                }
              )}
              href={getLoggingContainerHref(summary, basePath)}
              iconType="logsApp"
              message={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.container.message',
                {
                  defaultMessage: 'Show container logs',
                }
              )}
              tooltipContent={i18n.translate(
                'xpack.synthetics.monitorList.loggingIntegrationAction.container.tooltip',
                {
                  defaultMessage: 'Check Logging UI for container ID "{containerId}"',
                  values: {
                    containerId,
                  },
                }
              )}
            />
          </EuiFlexItem>
        </React.Fragment>
      ) : null}
    </EuiFlexGroup>
  ) : (
    <FormattedMessage
      defaultMessage="No integrated applications available"
      description="This message is shown when no applications that Uptime links to are enabled in the current space"
      id="xpack.synthetics.monitorList.integrationGroup.emptyMessage"
    />
  );
};
