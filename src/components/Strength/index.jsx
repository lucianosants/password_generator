export default function Strength({ bg, description }) {
	return (
		<>
			<div className='bg-zinc-600 items-center border-amber-200 border rounded mt-4 py-3 px-4 flex justify-between w-full'>
				<h4 className=''>Strength</h4>
				<div
					className={`w-2/3 ${bg} text-zinc-900 uppercase py-1 font-bold rounded-full shadow shadow-amber-200`}
				>
					<span>{description}</span>
				</div>
			</div>
		</>
	);
}
