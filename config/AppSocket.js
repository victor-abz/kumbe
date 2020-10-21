import { ForumRoom } from '../helpers';

const forumRoom = new ForumRoom();
/**
 * @class {AppSocket} Generated class from socket io
 */
class AppSocket {
	/**
	 *
	 * @param {Object} client Socket object
	 */
	connection(client) {
		client.on('join', ({ userId, name }, socketJoinCb) => {
			const newUser = forumRoom.addUser(client.id, userId, name);
			client.join(forumRoom.roomName);
			client.emit('join-message', {
				senderId: userId,
				senderName: 'Kumbe',
				content: `${newUser.name}, Welcome to The Forum`
			});
			client.broadcast.to(forumRoom.roomName).emit('join-message', {
				senderId: userId,
				senderName: 'Kumbe',
				content: `${newUser.name} has joined`
			});
			global.io.to(forumRoom.roomName).emit('users-list', {
				users: forumRoom.getRoomUsers()
			});
			socketJoinCb();
		});
		client.on('disconnect', () => {
			console.log('disconnect');
			const user = forumRoom.removeUser(client.id);
			if (user) {
				global.io.to(forumRoom.roomName).emit('users-list', {
					users: forumRoom.getRoomUsers()
				});
			}
		});
	}
}

export const appSocket = new AppSocket();
