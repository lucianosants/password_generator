import { useEffect, useRef, useState } from 'react';

import { BsClipboardCheck } from 'react-icons/bs';

import CheckInput from './components/CheckInput';
import Message from './components/Message';
import Strength from './components/Strength';

function App() {
	const [range, setRange] = useState(8);
	const [pass, setPass] = useState(['...']);

	const [upperChecked, setUpperChecked] = useState(true);
	const [lowerChecked, setLowerChecked] = useState(false);
	const [numbersChecked, setNumbersChecked] = useState(false);
	const [symbolsChecked, setSymbolsChecked] = useState(false);

	const [error, setError] = useState('');
	const [message, setMessage] = useState(false);

	const [bg, setBg] = useState(
		'bg-gradient-to-r from-amber-200 to-amber-400'
	);
	const [description, setDescription] = useState('medium');

	const copyPasswordRef = useRef('');

	const handleRand = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	const generateUppercase = () => String.fromCharCode(handleRand(65, 90));
	const generateLowercase = () => String.fromCharCode(handleRand(97, 122));
	const generateNumber = () => String.fromCharCode(handleRand(48, 57));
	const generateSymbol = () => String.fromCharCode(handleRand(33, 47));

	const generatePassword = (quantity, upper, lower, numbers, symbols) => {
		quantity = parseInt(quantity);
		const password = [];

		if (!lower && !upper && !numbers && !symbols) {
			setError('select at least one below');
		} else {
			setError('');
		}

		for (let i = 0; i < quantity; i++) {
			lower && password.push(generateLowercase());
			upper && password.push(generateUppercase());
			numbers && password.push(generateNumber());
			symbols && password.push(generateSymbol());
		}

		const generatedPassword = password.join('').slice(0, quantity);

		return setPass(generatedPassword);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		generatePassword(
			range,
			upperChecked,
			lowerChecked,
			numbersChecked,
			symbolsChecked
		);
	};

	const handleToCopy = async () => {
		const passwordText = copyPasswordRef.current.outerText;

		try {
			if (passwordText === '...' || passwordText === '') {
				alert('Try again!');
			}

			await navigator.clipboard.writeText(passwordText);
			setMessage(true);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (range < 8) {
			setBg('bg-gradient-to-r from-amber-200 to-red-500');
			setDescription('Weak');
		}

		if (
			(range > 8 && !upperChecked) ||
			(range > 8 && !lowerChecked) ||
			(range > 8 && !numbersChecked) ||
			(range > 8 && !symbolsChecked)
		) {
			setBg('bg-gradient-to-r from-amber-200 to-red-500');
			setDescription('Weak');
		}

		if (
			(range > 8 && lowerChecked) ||
			(range > 8 && upperChecked) ||
			(range > 8 && numbersChecked) ||
			(range > 8 && symbolsChecked)
		) {
			setBg('bg-gradient-to-r from-amber-200 to-amber-400');
			setDescription('Medium');
		}

		if (
			(range > 13 && lowerChecked) ||
			(range > 13 && upperChecked) ||
			(range > 13 && numbersChecked) ||
			(range > 13 && symbolsChecked)
		) {
			setBg('bg-gradient-to-r from-amber-200 to-green-500');
			setDescription('Strong');
		}
	}, [range, upperChecked, lowerChecked, numbersChecked, symbolsChecked]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, [handleToCopy]);

	return (
		<div className='App'>
			<div className='App__container'>
				<div className='App__title--container'>
					<h4 className='App__title'>Password Generator</h4>
				</div>
				<div className='App__password--container'>
					<span ref={copyPasswordRef}>{pass}</span>
					{error && <span>{error}</span>}
					<button
						className='App__password--copy--btn'
						type='button'
						onClick={handleToCopy}
					>
						<BsClipboardCheck size={19} />
					</button>
				</div>
				<div className='App__main'>
					<div className='App__length--container'>
						<span>Character Length</span>
						<span className='App__length--display'>{range}</span>
					</div>

					<div className='App__form--container'>
						<form onSubmit={handleSubmit} className='App__form'>
							<div className='App__form--length'>
								<label htmlFor='length'>6</label>
								<input
									className='App__length--input'
									type='range'
									min='6'
									max='18'
									id='length'
									value={range}
									onChange={(e) => setRange(e.target.value)}
								/>
								<label htmlFor='length'>18</label>
							</div>

							<div className='App__form--check'>
								<CheckInput
									checked={upperChecked}
									id='uppercase'
									label='Includes Uppercase Letters'
									value={upperChecked}
									event={() => setUpperChecked(!upperChecked)}
								/>

								<CheckInput
									checked={lowerChecked}
									id='lowercase'
									label='Includes Lowercase Letters'
									value={lowerChecked}
									event={() => setLowerChecked(!lowerChecked)}
								/>

								<CheckInput
									checked={numbersChecked}
									id='numbers'
									label='Includes Numbers'
									value={numbersChecked}
									event={() =>
										setNumbersChecked(!numbersChecked)
									}
								/>

								<CheckInput
									checked={symbolsChecked}
									id='symbols'
									label='Includes Symbols'
									value={symbolsChecked}
									event={() =>
										setSymbolsChecked(!symbolsChecked)
									}
								/>

								<Strength bg={bg} description={description} />

								<div className='App__form--footer'>
									<button
										className='App__form--submit'
										type='submit'
									>
										Generate &rarr;
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>

				{message && <Message />}
			</div>
		</div>
	);
}

export default App;
