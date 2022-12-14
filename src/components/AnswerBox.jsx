import styles from '../styles/components/AnswerBox.module.css'
export default function AnswerBox({
	question,
	submitAnswer,
	submitted,
	answer,
	setAnswer,
}) {
	function handleAnswerUpdate(e) {
		setAnswer(e.target.value)
	}

	function displayAnswerArea() {
		//FR form
		if (question.type == 'FR') {
			return (
				<form onSubmit={submitAnswer} className={styles['form-div']}>
					<textarea
						className={styles.frAnswer}
						name='answer-area'
						value={answer}
						onChange={(e) => handleAnswerUpdate(e)}
						placeholder='Answer here'
					/>
					<br />
					<button type='submit'>Submit</button>
				</form>
			)
		} else {
			//return MC form here
			return (
				<div className={styles['form-div']}>
					<div className={styles['form-wrapper']}>
						{question.choices.map((choice) => (
							<div
								className={[
									answer !== '' && answer == choice.choice
										? styles['selected']
										: '',
									styles['multiple-answer'],
								].join(' ')}
								onClick={() => {
									setAnswer(choice.choice)
								}}>
								{choice.choice}
							</div>
						))}
						<button onClick={submitAnswer}>Submit</button>
					</div>
				</div>
			)
		}
	}

	return (
		<div className={styles['wrapper']}>
			{!submitted && question ? (
				displayAnswerArea()
			) : (
				<div className={styles['waiting-div']}>
					<h1 className={styles['wait-text']}>Please wait for next question</h1>
					<img className={styles.dino} src='https://i.imgur.com/4dCGiXN.png' />
				</div>
			)}
		</div>
	)
}
