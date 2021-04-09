import Command from '../Command'
import request from 'request-promise'
import MessageEmbed from 'discord.js-commando'

export default
class HelpCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'wiki',
      properName: 'Wiki',
      description: 'Returns the given page from the wiki.',
      args: [
        {
          key: 'wikiPage',
          prompt: 'What wiki page were you looking for?',
          type: 'string'
        }
      ]
    })
  }

  async fn (msg, args) {
    let page = args.wikiPage
    let wikiResultPage = []
    try {
      const response = await request({
        method: 'GET',
        uri: `http://fwv.wikia.com/api/v1/Search/List/?query=${requestname}&limit=1`,
        json: true,
        resolveWithFullResponse: true
      })
      if (response.statusCode !== 404) {
        wikiResultPage = JSON.parse(response.body)
      }
    } catch(e) {} // We don't want this to crash the bot if for some reason it can't get the wiki page.
    if (wikiResultPage !== []) {
        let Embed = new MessageEmbed()
            .setTitle(`Results for ${page}`)
            .setDescription()
    }
  }
}