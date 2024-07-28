import { useTheme } from '../../ContextProvider/ContextProvider';
import './button.scss';
type TButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  role?: string;
  className: string;
  action?: () => void;
};
function Button({ text, className, action, type, role }: TButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      className={`${className} btn btn_${theme}`}
      onClick={action}
      type={type ? type : 'button'}
      role={role ? role : ''}
    >
      {text}
    </button>
  );
}

export default Button;
