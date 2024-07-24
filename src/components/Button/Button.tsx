import './button.scss';
type TButtonProps = {
  text: string;
  className: string;
  action: () => void;
};
function Button({ text, className, action }: TButtonProps) {
  return (
    <button type="button" className={`${className} btn`} onClick={action}>
      {text}
    </button>
  );
}

export default Button;
