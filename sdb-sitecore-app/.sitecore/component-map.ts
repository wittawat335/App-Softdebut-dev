// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as SiteInfoWidget from 'src/components/test-graphql/SiteInfoWidget';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as ProductList from 'src/components/products/ProductList';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as HelloSitecore from 'src/components/hello-sitecore/HelloSitecore';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as BossWidgetRichtext from 'src/components/boss-widget/BossWidgetRichtext';
import * as Simple from 'src/components/boss-widget/save/Simple';
import * as Header from 'src/components/boss-widget/save/Header';
import * as BlockBannerBossidiot007 from 'src/components/boss-widget/save/BlockBannerBossidiot007';
import * as BlockContainerBoss from 'src/components/boss-widget/content-blocks/BlockContainerBoss';
import * as BlockBannerBoss2 from 'src/components/boss-widget/content-blocks/BlockBannerBoss2';
import * as BlockBannerBoss from 'src/components/boss-widget/content-blocks/BlockBannerBoss';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['SiteInfoWidget', { ...SiteInfoWidget, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['ProductList', { ...ProductList, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['HelloSitecore', { ...HelloSitecore }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['BossWidgetRichtext', { ...BossWidgetRichtext }],
  ['Simple', { ...Simple }],
  ['Header', { ...Header }],
  ['BlockBannerBossidiot007', { ...BlockBannerBossidiot007 }],
  ['BlockContainerBoss', { ...BlockContainerBoss }],
  ['BlockBannerBoss2', { ...BlockBannerBoss2 }],
  ['BlockBannerBoss', { ...BlockBannerBoss }],
]);

export default componentMap;
