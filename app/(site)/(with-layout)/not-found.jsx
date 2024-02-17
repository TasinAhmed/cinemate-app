const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex gap-x-5">
        <h1 className="border-r border-r-zinc-700 pr-6 text-2xl font-medium">
          404
        </h1>
        <div>
          <h2>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
