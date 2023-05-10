class TelegramMessage {
    phoneNumber
    describe
    messageEntities

    isEmptyNumber() {
        return this.phoneNumber?.trim()?.length === 0 ?? false
    }

    static of(phoneNumber, describe, messageEntities) {
        const bot = new TelegramMessage();
        bot.phoneNumber = phoneNumber
        bot.describe = describe
        bot.messageEntities = messageEntities
        return bot
    }

    static entityBuilder() {
        return new MessageEntityBuilder()
    }


}

class MessageEntityBuilder {
    #messageEntity = {
        type: 'regular',
        offset: 0,
        length: 0
    }

    type(value) {
        if (typeof value !== 'string') {
            throw 'MessageEntityBuilder: type is not string'
        }
        this.#messageEntity.type = value
        return this
    }

    offset(value) {
        if (typeof value !== 'number') {
            throw 'MessageEntityBuilder: offset is not number'
        }
        this.#messageEntity.offset = value
        return this
    }

    length(value) {
        if (typeof value !== 'number') {
            throw 'MessageEntityBuilder: length is not number'
        }
        this.#messageEntity.length = value
        return this
    }

    build() {
        return this.#messageEntity
    }
}

export default TelegramMessage