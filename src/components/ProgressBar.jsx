const ProgressBar = ({ value, total }) => {

	const progress = (value / total) * 100

  return (
    <div className="relative h-5 w-full flex-1 text-center bg-slate-100 rounded-xl overflow-hidden">
      <div className="absolute text-sm font-bold z-50 left-1/2 transform -translate-x-1/2"> {value} / {total} </div>
      <div
        className="absolute h-5 bg-blue-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar