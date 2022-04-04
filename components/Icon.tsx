interface iconProps {
    iconClassName?: string;
    icon: React.ComponentType<{ className?: string; size: number, onClick?: () => void, title?: string }>;
    iconSize?: number;
    cb: () => void,
    title?: string
}

const Icon = (props: iconProps) => {
    const {
        iconSize = 16,
        icon: Icon,
        iconClassName,
        cb,
        title
    } = props;

    return (
        <Icon onClick={cb} className={iconClassName} size={iconSize} title={title} />
    );
};

export default Icon;