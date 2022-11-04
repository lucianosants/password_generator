import { HiClipboardCheck } from 'react-icons/hi';

export default function Message() {
	return (
		<div className='App__message'>
			<HiClipboardCheck size={24} />
			<p className='App__message--text'>Copied to clipboard.</p>
		</div>
	);
}
