/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';
import { EuiFormRow, EuiButtonGroup } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { RENDER_AS } from '../../../../common/constants';

const options = [
  {
    id: 'clusters',
    label: i18n.translate('xpack.maps.source.esGeoGrid.pointsDropdownOption', {
      defaultMessage: 'clusters',
    }),
    value: RENDER_AS.POINT,
  },
  {
    id: 'grids',
    label: i18n.translate('xpack.maps.source.esGeoGrid.gridRectangleDropdownOption', {
      defaultMessage: 'grids',
    }),
    value: RENDER_AS.GRID,
  },
];

export function RenderAsSelect(props: {
  renderAs: RENDER_AS;
  onChange: (newValue: RENDER_AS) => void;
  isColumnCompressed?: boolean;
}) {
  const currentOption = options.find((option) => option.value === props.renderAs) || options[0];
  const [selectedOption, setSelectedOption] = useState(currentOption.id);

  if (props.renderAs === RENDER_AS.HEATMAP) {
    return null;
  }

  function onChange(id: string) {
    const data = options.find((option) => option.id === id);
    props.onChange(data?.value as RENDER_AS);
    setSelectedOption(id);
  }

  return (
    <EuiFormRow
      label={i18n.translate('xpack.maps.source.esGeoGrid.showAsLabel', {
        defaultMessage: 'Show as',
      })}
      display={props.isColumnCompressed ? 'columnCompressed' : 'row'}
    >
      <EuiButtonGroup
        type="single"
        legend={i18n.translate('xpack.maps.source.esGeoGrid.showAsSelector', {
          defaultMessage: 'Choose the view',
        })}
        options={options}
        idSelected={selectedOption}
        onChange={(id: string) => onChange(id)}
        isFullWidth={true}
        buttonSize="compressed"
      />
    </EuiFormRow>
  );
}
