import React from "react";
import { ComponentProps } from "lib/component-props";
import { Field, withDatasourceCheck } from "@sitecore-content-sdk/nextjs";

type HelloSitecoreProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    description: Field<string>;
  };
};

const HelloSitecore = (props: HelloSitecoreProps) => {
  return (
    <div className="p-10 bg-blue-50 text-center">
      <h2 className="text-3xl font-bold text-blue-800">test</h2>
      <div className="mt-4 text-gray-600">test</div>
    </div>
  );
};

export default withDatasourceCheck()<HelloSitecoreProps>(HelloSitecore);
