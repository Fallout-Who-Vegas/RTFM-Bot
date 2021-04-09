import { Command as _Command } from 'discord.js-commando'

export default
class Command extends _Command {
  constructor (client, info) {
    info.guildOnly = info.guildOnly == null ? true : info.guildOnly
    info.memberName = info.name
    info.argsPromptLimit = 1

    super(client, info)

    this.properName = info.properName
    this.userPermissions = info.userPermissions || ['MANAGE_GUILD']
    this.discordBot = this.client.discordBot
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || !msg.guild || msg.member.hasPermission(this.userPermissions) || msg.member.roles.cache.find(role => role.name === 'The High Council')
  }

  async run (msg, args, pattern) {
    return this.fn(msg, args, pattern)
  }
}