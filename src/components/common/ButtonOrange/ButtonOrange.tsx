import s from './ButtonOrange.module.css'

export const ButtonOrange = ({title, width, height, onClick, disabled = false, alignSelf, backgroundColor, margin}:any) => {

    const style = {
        width, height, alignSelf, backgroundColor, margin
    }

    return(
        <button className={`${s.button_orange} ${disabled ? s.disabled : {}}`} style={style} onClick={onClick} disabled={disabled}>{title}</button>
    )
}