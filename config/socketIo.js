import socketIo from 'socket.io';
import { ForumRoom } from '../helpers';

const port = process.env.PORT || 3000;
const forumRoom = new ForumRoom();
/**
 *
 * @param {Express} app
 */
export const appSocket = (app) => {
	/**
	 * Start express server
	 */
	const server = app.listen(port, () =>
		console.log(`listening on port ${port}`)
	);
	const io = socketIo(server);

	io.on('connect', (socket) => {
		socket.on('join', ({ userId, name }, socketJoinCb) => {
			const newUser = forumRoom.addUser(socket.id, userId, name);

			socket.join(forumRoom.roomName);
			socket.emit('join-message', {
				senderId: userId,
				senderName: 'Kumbe',
				content: `${newUser.name}, Welcome to The Forum`
			});
			socket.broadcast.to(forumRoom.roomName).emit('join-message', {
				senderId: userId,
				senderName: 'Kumbe',
				content: `${newUser.name} has joined`
			});
			io.to(chatRoom.roomName).emit('users-list', {
				users: chatRoom.getRoomUsers()
			});
			socketJoinCb();
		});
		socket.on('disconnect', () => {
			const user = forumRoom.removeUser(socket.id);
			if (user) {
				io.to(forumRoom.roomName).emit('users-list', {
					users: forumRoom.getRoomUsers()
				});
			}
		});
	});
};
