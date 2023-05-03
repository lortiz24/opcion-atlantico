import { Typography } from 'antd';
import { useState } from 'react';

const { Paragraph } = Typography;

interface IExpandableParagraphProps {
    text: string;
    length: number
}
const ExpandableParagraph = ({ text, length }: IExpandableParagraphProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Paragraph >
            {expanded ? text : `${text.slice(0, length)}...`}
            {text.length > length && (
                <>
                    <br />
                    <Typography.Link onClick={toggleExpanded}>
                        {expanded ? 'Ver menos' : 'Ver más'}
                    </Typography.Link>
                </>
            )}
        </Paragraph>
    );
}

export default ExpandableParagraph
