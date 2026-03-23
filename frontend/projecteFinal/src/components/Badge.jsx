    const Badge = ({ clase, children }) => {
    return (
        <span className={clase}>
        {children}
        </span>
    );
    };

    export default Badge;