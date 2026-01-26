import {
    Field,
    ImageField,
    NextImage as ContentSdkImage,
    Link as ContentSdkLink,
    LinkField,
    Text,
} from "@sitecore-content-sdk/nextjs";
import React from "react";
import { ComponentProps } from "lib/component-props";

interface ImageFields {
    Image: ImageField;
    ImageCaption: Field<string>;
    TargetUrl: LinkField;
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
    const { fields, params, page } = props;
    const { styles, RenderingIdentifier: id } = params;

    if (!fields) {
        return <ImageDefault {...props} />;
    }

    const Image = () => <ContentSdkImage field={fields.Image} />;
    const shouldWrapWithLink =
        !page.mode.isEditing && fields.TargetUrl?.value?.href;

    return (
        <ImageWrapper className={`${styles}`} id={id}>
            <div className="relative w-full overflow-hidden">
                {/* Image */}
                <Image />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#e46e04] to-transparent" />

                {/* Text + CTA */}
                <div className="absolute inset-0 flex items-center">
                    <div className="px-6 md:px-10 text-white">
                        <div className="text-xl md:text-3xl font-semibold leading-tight">
                            <Text field={fields.ImageCaption} />
                        </div>

                        {shouldWrapWithLink && (
                            <div className="mt-4">
                                <ContentSdkLink
                                    field={fields.TargetUrl}
                                    className="
                inline-flex items-center justify-center
                px-6 py-3
                bg-white text-orange-600
                font-medium
                rounded-full
                hover:bg-orange-100
                transition-all
              "
                                >
                                    Contact us
                                </ContentSdkLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ImageWrapper>

    );
};
