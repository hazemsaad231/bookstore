function Load() {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-300 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  export default Load