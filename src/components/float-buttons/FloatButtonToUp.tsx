import React, { useState } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const FloatButtonToUp = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    };


    window.addEventListener('scroll', toggleVisible);

    return (

        <Space style={{ position: "fixed", right: "1%", bottom: "10%", zIndex: 200 }}>
            <Button
                type='primary'
                onClick={scrollToTop}
                style={{
                    display: visible ? "block" : "none",
                    width: "50px", height: "50px",
                    borderRadius: "50%",
                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)'
                }}
            >
                <ArrowUpOutlined />
            </Button>
        </Space>

    )
}

export default FloatButtonToUp