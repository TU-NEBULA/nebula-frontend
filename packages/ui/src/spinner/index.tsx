const Spinner = () => {
  return (
    <div
      className="w-12 h-12 rounded-full animate-spin flex items-center justify-center"
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, #111111 0deg, rgba(17, 17, 17, 0) 360deg)",
      }}
    >
      <div className="w-8 h-8 bg-white rounded-full" />
    </div>
  );
};

export default Spinner;
