export default function Button({ children, ...props }) {
  return (
    <div>
      <button
        {...props}
        className="bg-dark"
        style={{ border: "none", color: "white" }}
      >
        {children}
      </button>
    </div>
  );
}
