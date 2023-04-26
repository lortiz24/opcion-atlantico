import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from './utils/upload.utils';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';



interface IMyUploadComponentProps extends FormItemLabelProps {
    onSetFile: (item: UploadFile | UploadFile[]) => void;
    maxFiles?: number;
    name?: string
    typeFile?: string,
    previewTitle?: string
}

const MyUploadComponent = ({ onSetFile, maxFiles, label, name, previewTitle }: IMyUploadComponentProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        // setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        onSetFile(newFileList)
        setFileList(newFileList);
    }


    return (
        <Form.Item label={label} name={name} >
            <Upload
                beforeUpload={(file) => {
                    onSetFile([...fileList, file])
                    setFileList([...fileList, file])
                    return false;
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= (maxFiles ?? 1) ? null : (<div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>)}
            </Upload>
            <Modal open={previewOpen} footer={null} title={previewTitle} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form.Item>
    );
};

export default MyUploadComponent;