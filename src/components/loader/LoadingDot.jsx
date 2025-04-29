const LoadingDot = () => {
  return (
    <div>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-sky-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}

export default LoadingDot