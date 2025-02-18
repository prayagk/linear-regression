import { useLRStore } from "../store";

function Loader() {
  const loader = useLRStore((state) => state.loader);
  if (!loader.isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <div className="mt-4 bg-black px-2 py-1 text-center">
          <p className="text-white text-lg font-semibold">{loader.status}</p>
          <p className="text-white font-extralight ">{loader.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
