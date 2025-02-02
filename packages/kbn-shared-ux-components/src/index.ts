/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { withSuspense } from '@kbn/shared-ux-utility';

export const LazyToolbarButton = React.lazy(() =>
  import('./toolbar').then(({ ToolbarButton }) => ({
    default: ToolbarButton,
  }))
);

export const RedirectAppLinks = React.lazy(() => import('./redirect_app_links'));

/**
 * A `ToolbarButton` component that is wrapped by the `withSuspense` HOC.  This component can
 * be used directly by consumers and will load the `LazyToolbarButton` component lazily with
 * a predefined fallback and error boundary.
 */
export const ToolbarButton = withSuspense(LazyToolbarButton);

/**
 * An example of the toolbar button and popover
 */
export { AddFromLibraryButton, ToolbarPopover } from './toolbar';

/**
 * The Lazily-loaded `NoDataViews` component.  Consumers should use `React.Suspense` or the
 * `withSuspense` HOC to load this component.
 */
export const LazyNoDataViews = React.lazy(() =>
  import('./empty_state/no_data_views').then(({ NoDataViews }) => ({
    default: NoDataViews,
  }))
);

/**
 * A `NoDataViews` component that is wrapped by the `withSuspense` HOC.  This component can
 * be used directly by consumers and will load the `LazyNoDataViews` component lazily with
 * a predefined fallback and error boundary.
 */
export const NoDataViews = withSuspense(LazyNoDataViews);

/**
 * A pure `NoDataViews` component, with no services hooks. Consumers should use `React.Suspense` or the
 * `withSuspense` HOC to load this component.
 */
export const LazyNoDataViewsComponent = React.lazy(() =>
  import('./empty_state/no_data_views').then(({ NoDataViewsComponent }) => ({
    default: NoDataViewsComponent,
  }))
);

/**
 * A pure `NoDataViews` component, with no services hooks. The component is wrapped by the `withSuspense` HOC.
 * This component can be used directly by consumers and will load the `LazyNoDataViewsComponent` lazily with
 * a predefined fallback and error boundary.
 */
export const NoDataViewsComponent = withSuspense(LazyNoDataViewsComponent);

/**
 * The Lazily-loaded `IconButtonGroup` component.  Consumers should use `React.Suspense` or the
 * `withSuspense` HOC to load this component.
 */
export const LazyIconButtonGroup = React.lazy(() =>
  import('./toolbar').then(({ IconButtonGroup }) => ({
    default: IconButtonGroup,
  }))
);

/**
 * The IconButtonGroup component that is wrapped by the `withSuspence` HOC.
 */
export const IconButtonGroup = withSuspense(LazyIconButtonGroup);

/**
 * The lazily loaded `KibanaPageTemplate` component that is wrapped by the `withSuspense` HOC. Consumers should use
 * `React.Suspense` or `withSuspense` HOC to load this component.
 */
export const KibanaPageTemplateLazy = React.lazy(() =>
  import('./page_template').then(({ KibanaPageTemplate }) => ({
    default: KibanaPageTemplate,
  }))
);

/**
 * A `KibanaPageTemplate` component that is wrapped by the `withSuspense` HOC.  This component can
 * be used directly by consumers and will load the `KibanaPageTemplateLazy` component lazily with
 * a predefined fallback and error boundary.
 */
export const KibanaPageTemplate = withSuspense(KibanaPageTemplateLazy);

/**
 * The lazily loaded `KibanaPageTemplateSolutionNav` component that is wrapped by the `withSuspense` HOC. Consumers should use
 * `React.Suspense` or `withSuspense` HOC to load this component.
 */
export const KibanaPageTemplateSolutionNavLazy = React.lazy(() =>
  import('./page_template/solution_nav').then(({ KibanaPageTemplateSolutionNav }) => ({
    default: KibanaPageTemplateSolutionNav,
  }))
);

/**
 * A `KibanaPageTemplateSolutionNav` component that is wrapped by the `withSuspense` HOC.  This component can
 * be used directly by consumers and will load the `KibanaPageTemplateSolutionNavLazy` component lazily with
 * a predefined fallback and error boundary.
 */
export const KibanaPageTemplateSolutionNav = withSuspense(KibanaPageTemplateSolutionNavLazy);

/**
 * The Lazily-loaded `KibanaSolutionAvatar` component.  Consumers should use `React.Suspense` or
 * the withSuspense` HOC to load this component.
 */
export const KibanaSolutionAvatarLazy = React.lazy(() =>
  import('./solution_avatar').then(({ KibanaSolutionAvatar }) => ({
    default: KibanaSolutionAvatar,
  }))
);

/**
 * A `KibanaSolutionAvatar` component that is wrapped by the `withSuspense` HOC. This component can
 * be used directly by consumers and will load the `KibanaPageTemplateSolutionNavAvatarLazy` component lazily with
 * a predefined fallback and error boundary.
 */
export const KibanaSolutionAvatar = withSuspense(KibanaSolutionAvatarLazy);
