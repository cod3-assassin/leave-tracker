
const Loader = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
