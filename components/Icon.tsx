interface followProps {
    iconClassName?: string;
    icon: React.ComponentType<{ className?: string; size: number, onClick?: () => void }>;
    iconSize?: number;
    cb: () => void
}

const Icon = (props: followProps) => {
    const {
        iconSize = 16,
        icon: Icon,
        iconClassName,
        cb
    } = props;

    return (
        <Icon onClick={cb} className={iconClassName} size={iconSize} />
    );
};

export default Icon;