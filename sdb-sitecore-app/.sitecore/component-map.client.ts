// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as SiteInfoWidget from 'src/components/test-graphql/SiteInfoWidget';
import * as ProductList from 'src/components/products/ProductList';
import * as Navigation from 'src/components/navigation/Navigation';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['SiteInfoWidget', { ...SiteInfoWidget }],
  ['ProductList', { ...ProductList }],
  ['Navigation', { ...Navigation }],
]);

export default componentMap;
