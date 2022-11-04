export default function CheckInput({ checked, value, event, id, label }) {
	return (
		<div className='App__check--content'>
			<input
				type='checkbox'
				id={id}
				checked={checked}
				value={value}
				onChange={event}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
}
