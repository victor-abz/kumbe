export class ForumRoom {
	constructor() {
		this.roomName = 'FORUM_ROOM';
		this.users = [];
	}
	userExist(id) {
		return this.users.find((user) => user.id === id);
	}
	addUser(socketId, userId, name) {
		const newUser = { id: socketId, userId, name, room: this.roomName };
		if (this.userExist(socketId)) return this.userExist(socketId);
		this.users.push(newUser);
		return newUser;
	}
	removeUser(id) {
		const userIndex = this.users.findIndex((user) => user.id === id);

		if (userIndex !== -1) return this.users.splice(userIndex, 1)[0];
	}
	getRoomUsers() {
		return this.users;
	}
}
