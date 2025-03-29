import SquareIcon from "../squareIcon"

interface TitleElementProps {
    title: string
}

const TitleElement: React.FC<TitleElementProps> = ({ title }) => {
    return (
        <div className="flex items-center mb-4 md:mb-0">
            <SquareIcon />
            <span className="ml-2 text-lg font-bold">{title}</span>
        </div>
    )
}
export default TitleElement;