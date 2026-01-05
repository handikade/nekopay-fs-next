export interface NekoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  child: React.ReactNode;
}

const NekoButton = ({ child, className, type, ...props }: NekoButtonProps) => {
  const combinedClassName = `px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`;

  return (
    <button type={type} className={combinedClassName} {...props}>
      {child}
    </button>
  );
};

export default NekoButton;
