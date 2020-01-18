class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announFriendship(name);
    }

    announFriendship(name) {
        global.console.log(name + ' is now a friend');
    }
}

describe('FriendsList', () => {
    it('Initializes friends list', () => {
        const friendsList = new FriendsList();
        expect(friendsList.friends.length).toEqual(0);
    });

    it('Add some friend to list', () => {
        const friendsList = new FriendsList();
        friendsList.addFriend('Ngoc');
        expect(friendsList.friends.length).toEqual(1);
    });

    it('Announces friendship', () => {
        const friendsList = new FriendsList();
        friendsList.announFriendship = jest.fn();
        friendsList.addFriend('Ngoc123');
        expect(friendsList.announFriendship).toHaveBeenCalled();
    });
});
