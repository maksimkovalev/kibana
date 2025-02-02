/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { prefixIndexPatternWithCcs } from '../../../../../common/ccs_utils';
import { INDEX_PATTERN_BEATS } from '../../../../../common/constants';
import {
  postBeatsOverviewRequestParamsRT,
  postBeatsOverviewRequestPayloadRT,
  postBeatsOverviewResponsePayloadRT,
} from '../../../../../common/http_api/beats';
import { getLatestStats, getStats } from '../../../../lib/beats';
import { createValidationFunction } from '../../../../lib/create_route_validation_function';
import { getMetrics } from '../../../../lib/details/get_metrics';
import { handleError } from '../../../../lib/errors';
import { MonitoringCore } from '../../../../types';
import { metricSet } from './metric_set_overview';

export function beatsOverviewRoute(server: MonitoringCore) {
  server.route({
    method: 'post',
    path: '/api/monitoring/v1/clusters/{clusterUuid}/beats',
    validate: {
      params: createValidationFunction(postBeatsOverviewRequestParamsRT),
      body: createValidationFunction(postBeatsOverviewRequestPayloadRT),
    },
    async handler(req) {
      const config = server.config;
      const ccs = req.payload.ccs;
      const clusterUuid = req.params.clusterUuid;
      const beatsIndexPattern = prefixIndexPatternWithCcs(config, INDEX_PATTERN_BEATS, ccs);

      try {
        const [latest, stats, metrics] = await Promise.all([
          getLatestStats(req, beatsIndexPattern, clusterUuid),
          getStats(req, beatsIndexPattern, clusterUuid),
          getMetrics(req, 'beats', metricSet),
        ]);

        return postBeatsOverviewResponsePayloadRT.encode({
          ...latest,
          stats,
          metrics,
        });
      } catch (err) {
        throw handleError(err, req);
      }
    },
  });
}
