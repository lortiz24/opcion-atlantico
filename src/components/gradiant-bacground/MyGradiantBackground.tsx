interface IMyGradiantBackgroundProps {
    colorRight: string;
    colorLeft: string;
    opacityRight?: number;
    opacityLeft?: number;
}

const MyGradiantBackground = ({ colorRight, colorLeft, opacityLeft = 1, opacityRight = 0.8995973389355743 }: IMyGradiantBackgroundProps) => {
    return (
        <div
            style={{
                border: '0px solid',
                borderRadius: '15px 15px 0 0',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage:
                    `linear-gradient(90deg, rgba(${hexToRgb(colorLeft)},${opacityLeft}) 0%, rgba(${hexToRgb(colorRight)},${opacityRight}) 100%)`,
                zIndex: -1,
            }}
        />
    )
}

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

export default MyGradiantBackground
