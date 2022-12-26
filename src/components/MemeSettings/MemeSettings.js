const MemeSettings = ({
	textNumber,
	memeTextSize,
	onSetMemeText,
	onSetMemeTextSize,
	onSetMemeTextColor,
}) => {
	return (
		<div>
			<input
				type="text"
				className="inputText"
				onChange={onSetMemeText}
				placeholder={` ${textNumber}`}
			/>
			<p>Tamaño del {textNumber}</p>
			<input
				type="range"
				min="0"
				max="72"
				value={memeTextSize}
				onChange={onSetMemeTextSize}
			></input>
			<p>Color del {textNumber}</p>
			<input type="color" onChange={onSetMemeTextColor}></input>
		</div>
	);
};

export default MemeSettings;