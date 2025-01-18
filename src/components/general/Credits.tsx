interface CreditsComponentProps {
  children: React.ReactNode;
}

const Credits = ({ children }: CreditsComponentProps) => {
  return (
    <div className="abosolute bottom-0 flex flex-col w-full items-center justify-center text-sm text-gray-600 mt-4">
      <div>
        <h3 className="text-left w-full font-bold text-gray-800 mb-2">
          Credits ❤️
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Credits;
