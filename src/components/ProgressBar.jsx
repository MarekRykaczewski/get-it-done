const ProgressBar = ({ value, total }) => {

	const progress = (value / total) * 100

  return (
    <div className="relative h-4 w-full flex-1 bg-slate-100 rounded-xl overflow-hidden">
      <div
        className="absolute h-4 bg-blue-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar