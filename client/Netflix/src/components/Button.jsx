function Button({ children, className }) {
  return (
    <>
      <button className={`${className} button`}>{children}</button>
    </>
  );
}

export default Button;
