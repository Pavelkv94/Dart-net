import s from "./BlockComponent.module.css";

const BlockComponent = ({ width = 300, height, margin, title, component, position, top }: any) => {
    const style = {
        width,
        height,
        margin,
        position,
        top
    };

    return (
        <div className={s.block} style={style}>
            <span className={s.title}>{title}</span>
            <div>{component}</div>
        </div>
    );
};

export default BlockComponent;
