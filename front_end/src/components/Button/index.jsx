
import './button.css'

const Button = ({children, onClick}) => {
    return(
        <button 
            onClick={onClick} 
            type='submit'
            className='button'
        >
            {children}
        </button>
    )
}

export default Button