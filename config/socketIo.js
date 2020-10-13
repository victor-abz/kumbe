import socketIo from 'socket.io';
import { ForumRoom, QueryHelper, replyValidator } from '../helpers';
import { Reply } from '../models';

const port = process.env.PORT || 3000;
const forumRoom = new ForumRoom();
const replyDb = new QueryHelper(Reply);
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
		socket.on('send-reply', (replyContent, sendReplyCb) => {
			replyValidator(replyContent, (error, user) => {
				if (error) {
					socket.emit('send-reply-error', { message: error });
					sendReplyCb();
				}
				let { ...body } = replyContent;
				if (body.parentId) body.discussionId = null;
				if (body.discussionId) body.parentId = null;
				if (!body.parentId && !body.discussionId) {
					socket.emit('send-reply-error', { message: error });
					sendReplyCb();
				}
				replyDb
					.create(body)
					.then((replyRes) => {
						delete user.password;
						const reply = {
							...user,
							id: replyRes.id,
							content: replyRes.content,
							anonymous: replyRes.content
						};
						io.to(forumRoom.roomName).emit('new-reply', reply);
						sendReplyCb();
					})
					.catch(() => {
						socket.emit('send-reply-error', { message: 'Reply not sent' });
						sendReplyCb();
					});
			});
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
