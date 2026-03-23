const Button = ({ clase, children, onClick, type = "button" }) => {
  return (
    <button className={clase} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;