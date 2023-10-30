const crypto = require('crypto');

class utils{
    static random_id(bnum = 10){
        return crypto.randomBytes(bnum).toString('hex');
    }

    static get_md5(buffer){
        return crypto.createHash('md5').update(buffer).digest("hex")
    }
}

module.exports = utils
