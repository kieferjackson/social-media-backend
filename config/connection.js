const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-media-db',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;