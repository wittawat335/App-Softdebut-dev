import React from "react";
import { Text, Field, ImageField, NextImage as ContentSdkImage, } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

import './style/BlockBannerBoss2.css';

interface ImageFields {
    Image: ImageField;
    ImageBannerHeader: Field<string>;
    ImageBannerSubHeader: Field<string>;
}

interface ImageProps extends ComponentProps {
    fields: ImageFields;
}

// ตัวห่อกลาง (Reusable Layout)
const ImageWrapper: React.FC<{
    className: string;
    id?: string;
    children: React.ReactNode;
}> = ({ className, id, children }) => (
    <div className={className.trim()} id={id}>
        <div className="component-content">{children}</div>
    </div>
);

// ImageDefault – Empty State
const ImageDefault: React.FC<ImageProps> = ({ params }) => (
    <ImageWrapper className={`component image ${params.styles}`}>
        <span className="is-empty-hint">Image</span>
    </ImageWrapper>
);

// Banner – Rendering Variant (Hero Banner)
export const Banner: React.FC<ImageProps> = ({ params, fields }) => {
    const { styles, RenderingIdentifier: id } = params;
    const imageField = fields.Image && {
        ...fields.Image,
        value: {
            ...fields.Image.value,
            style: { objectFit: "cover", width: "100%", height: "100%" },
        },
    };

    return (
        <div className={`component hero-banner ${styles}`.trim()} id={id}>
            <div className="">
                <ContentSdkImage
                    field={imageField}
                    loading="eager"
                    fetchPriority="high"
                />
            </div>
        </div>
    );
};

// Default – Rendering หลัก
export const Default: React.FC<ImageProps> = (props) => {
    const { fields, params, } = props;
    const { styles, RenderingIdentifier: id } = params;

    if (!fields) {
        return <ImageDefault {...props} />;
    }

    const Image = () => <ContentSdkImage field={fields.Image} />;

    return (
        <ImageWrapper className={`${styles}`} id={id}>

            <div className="relative w-full h-300px overflow-hidden">
                {/* Image */}
                <Image />

                {/* Overlay Gradient */}
                <div className="
      absolute inset-0
      bg-linear-to-r
      from-[#e46e04]
      via-[#e46e04]/5
      to-transparent
    " />

                {/* Decoration text */}
                <div className="absolute fade-up delay-4 top-4 left-6">
                    <span className="text-[10px] text-white px-6 py-0.5 bg-green-400 rounded-full animate-pulse">BlockBanner2</span>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="
        px-16 md:px-38 lg:px-56
        text-white
      ">
                        {/* Header */}
                        <div className="
          text-4xl
          md:text-6xl
          lg:text-8xl
          font-semibold
          leading-tight 
          fade-up delay-1
        ">
                            {fields.ImageBannerHeader.value}
                        </div>

                        {/* Sub Header */}
                        <div className="
          mt-4
          text-[18px]
          opacity-80
          font-bold 
          fade-up delay-2
        ">
                            {fields.ImageBannerSubHeader?.value}
                        </div>
                    </div>

                </div>
            </div>
        </ImageWrapper>

    );
};
