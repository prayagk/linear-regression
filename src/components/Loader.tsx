import { useLRStore } from "../store";

function Loader() {
  const loader = useLRStore((state) => state.loader);
  if (!loader.isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-semibold">{loader.status}</p>
      </div>
    </div>
  );
}

export default Loader;
