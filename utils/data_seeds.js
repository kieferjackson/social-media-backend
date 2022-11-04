
class UserSeed 
{
    constructor(username, email)
    {
        this.username = username;
        this.email = email;
    }
}

class ThoughtSeed
{
    constructor(text, username)
    {
        this.thoughtText = text;
        this.username = username;
    }
}

// User Data
const users =
[
    new UserSeed('mondo_man', 'mondo@gmail.com'),
    new UserSeed('rolling_star', 'prince@cosmos.com'),
    new UserSeed('michaelS', 'michael@gmail.com')
];

// Thought Data
const thoughts =
[
    new ThoughtSeed('I love NFTs, but you better not take any screenshots!', 'mondo_man'),
    new ThoughtSeed('What happened to the stars? They all disappeared!', 'rolling_star'),
    new ThoughtSeed('Hey! Michael here...or am I?', 'michaelS')
]

module.exports = { users, thoughts };