const Input = ({ clase, value, onChange, type = "text", ...props }) => {
  return (
    <input
      className={clase}
      value={value}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

export default Input;