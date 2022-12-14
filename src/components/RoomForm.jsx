import Client from '../util/api'
import styles from '../styles/components/RoomForm.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoomForm({
	user,
	name,
	accountInfo,
	addToRoomList,
	roomList,
	setMainDisplay,
	setRoomList,
}) {
	let navigate = useNavigate()
	const [roomName, setRoomName] = useState(name ? name : '')
	const [submitted, setSubmitted] = useState(false)

	const handleChange = (event) => {
		setRoomName(event.target.value)
	}

	const createRoom = async () => {
		const res = await Client.post('/api/room/submit', {
			name: roomName,
			owner_id: accountInfo.id,
		})
		addToRoomList(res.data)
		setMainDisplay(0)
	}

	const deleteRoom = async (index) => {
		try {
			await Client.delete(`/api/room/delete/${roomList[index].id}`)
			let tempRoomlist = [...roomList]
			tempRoomlist.splice(index, 1)
			setRoomList(tempRoomlist)
		} catch (error) {}
	}

	useEffect(() => {
		if (submitted) {
			createRoom()
			setSubmitted(false)
		}
	}, [submitted])

	return (
		<div className={styles['wrapper']}>
			<div className={styles['room-list']}>
				{roomList.map((room, index) => (
					<div className={styles['room-wrapper']}>
						<div onClick={() => deleteRoom(index)} className={styles['delete']}>
							Delete
						</div>
						<div className={styles['text-room']}>{room.name}</div>
					</div>
				))}
			</div>
			<div className={styles['form-body']}>
				<input
					className={styles['input']}
					type='text'
					name='room'
					value={roomName}
					onChange={handleChange}
					placeholder='room name'
				/>
				<div onClick={() => setSubmitted(true)} className={styles['pseudo-button']}>
					Create
				</div>
			</div>
		</div>
	)
}
