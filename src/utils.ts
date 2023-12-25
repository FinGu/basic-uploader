import {randomBytes, createHash, BinaryLike} from 'crypto';

export default class utils{
    static random_id(bnum: number = 10): string{
        return randomBytes(bnum).toString('hex');
    }

    static get_md5(buffer: BinaryLike): string{
        return createHash('md5').update(buffer).digest("hex")
    }
}
