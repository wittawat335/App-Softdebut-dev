import React from 'react';
import { Text, Field, ImageField } from "@sitecore-content-sdk/nextjs";

interface SimpleTextProps {
    fields: {
        title: Field<string>;
        backgroundImage: ImageField;
        // เพิ่มฟิลด์ใหม่ใน Interface
        fontSize: Field<string>;
        imageHeight: Field<string>;
        textColor: Field<string>;
    };
}

export const SimpleText: React.FC<SimpleTextProps> = ({ fields }) => {
    const bgImage = fields.backgroundImage?.value?.src;

    // ดึงค่าจากฟิลด์มาใช้ ถ้าไม่มีข้อมูลให้ใช้ค่า Default (Fallback)
    const customFontSize = fields.fontSize?.value || '2rem';
    const customHeight = fields.imageHeight?.value || '300px';
    const customColor = fields.textColor?.value || '#ffffff';

    return (
        <div
            className="simple-text-wrapper"
            style={{
                padding: '50px',
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // ใช้ค่าที่ User กรอกมาปรับความสูง
                minHeight: customHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h2 style={{
                // ใช้ค่าที่ User กรอกมาปรับขนาดและสีตัวอักษร
                fontSize: customFontSize,
                color: customColor,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                textAlign: 'center'
            }}>
                <Text field={fields.title} />
            </h2>
        </div>
    );
};

export default SimpleText;