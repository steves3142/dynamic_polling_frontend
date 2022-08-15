import styles from '../styles/components/ViewAllAnswerBox.module.css'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js/auto'

export default function ViewAllAnswerBox({ socket, answers }) {
	const [chartData, setchartData] = useState({
		labels: [],
		datasets: [
			{
				label: 'choices',
				borderColor: '#e95151',
				data: [],
				backgroundColor: [
					'rgba(255,0,0,1)',
				],
			},
		],
	})
	const [chartOptions, setChartOptions] = useState({
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: `# Students`,
				},
			},
		},
		// animation: false,
	})

	useEffect(() => {
		let responses = answers.map((answer) => answer.response)
		let unique = new Set(responses)
		let responsePair = {}
		for (const response of responses) {
			if (responsePair[response]) {
				responsePair[response]++
			} else {
				responsePair[response] = 1
			}
		}
		let chartDataCopy = { ...chartData }
		chartDataCopy.labels = Array.from(unique).sort()
		let data = Object.keys(responsePair).map((key) => responsePair[key])
		chartDataCopy.datasets[0].data = data
		setchartData(chartDataCopy)
	}, [answers])

	function sendAnswer() {
		let randomChoices = [
			'Snickers',
			'Ritz Cracker',
			'Pringles',
			"Hershey's",
			"M &M's",
		]
		socket.emit('newAnswer', {
			answer: {
				id: 1,
				student_id: 1,
				response: randomChoices[Math.floor(Math.random() * 5)],
			},
			room: 10,
		})
	}

	return (
		<div className={styles['wrapper']}>
			<div>
				<h3>Answer log here</h3>
				{answers.length > 0 ? (
					<Bar data={chartData} redraw={true} options={chartOptions} />
				) : (
					''
				)}
			</div>
			<button onClick={sendAnswer}>send answer</button>
		</div>
	)
}
