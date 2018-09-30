import md5 from 'md5';

export class UserModel {
    constructor(data) {
        Object.assign(this, data);
    }

    get avatar() {
        const emailHash = md5(this.email.toLowerCase());
        return `https://www.gravatar.com/avatar/${emailHash}?s=300`;
    }
}
