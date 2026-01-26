import React from 'react';
// 1. เปลี่ยนจาก Text เป็น RichText
import { RichText, Field, ImageField } from "@sitecore-content-sdk/nextjs";

interface HeaderProps {
    fields: {
        title: Field<string>; // อันนี้คือ Rich Text ฟิลด์
        backgroundImage: ImageField;
        fontSize: Field<string>;
        imageHeight: Field<string>;
        textColor: Field<string>;
    };
}

export const Header: React.FC<HeaderProps> = ({ fields }) => {
    const bgImage = fields.backgroundImage?.value?.src;

    const customFontSize = fields.fontSize?.value || '2rem';
    const customHeight = fields.imageHeight?.value || '300px';
    const customColor = fields.textColor?.value || '#ffffff';

    return (
        <div
            className="header-wrapper"
            style={{
                padding: '50px',
                backgroundImage: bgImage ? `url('${bgImage}')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: customHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333'
            }}
        >
            {/* 2. เปลี่ยนมาใช้คอมโพเนนต์ RichText แทน Text */}
            <div style={{
                fontSize: customFontSize,
                color: customColor,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                textAlign: 'center'
            }}>
                <RichText field={fields.title} />
            </div>
        </div>
    );
};

export default Header;