const config = require('config.json');
const jwt = require('jsonwebtoken');

const users = [{id: 1, username: 'auth test', password: 'auth test', firstName: 'Jim', lastName: 'Brown'}];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({username, password}) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({sub: user.id}, config.secret);
        const {password, ...userWithoutPassword} = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword} = u;
        return userWithoutPassword;
    });
}