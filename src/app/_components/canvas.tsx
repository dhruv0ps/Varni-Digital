import ModularHolder from './ModularComponents/modularHolder';

interface CanvasElementProps {
    canvasNo: number,
    data?: { optionType: string; options: { id: string; item: string; price: number; }[]; }[];
    showCanvasBorder: boolean;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ data = [], showCanvasBorder, canvasNo }) => {
    const canvasStyle = {
        border: showCanvasBorder ? '3px solid white' : 'none',
    };

    return (
        <div className="flex justify-center items-center text-white" style={canvasStyle}>
            {data && data.map(accessory => (
                accessory.options.map((option, index) => {
                    return (
                        <ModularHolder
                            key={index}
                            canvasNo={canvasNo}
                            modularNo={`accessory.optionType-${option.id.toString()}`}
                            optionType={accessory.optionType}
                            option={option}
                        />
                    );
                })
            ))}
        </div>
    );
};

export default CanvasElement;
