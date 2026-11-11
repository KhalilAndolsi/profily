const Field = ({ label, children, className = "" }) => (
  <label className={`grid gap-2 text-sm font-medium ${className}`}>
    {label}
    {children}
  </label>
);

export default Field;
