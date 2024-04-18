import path from 'path'
import fs from 'fs'
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

const main = async () => {
  await digitalTwinDemo();
};

const generateArticle = (articable: any, type: 'space' | 'challenge' | 'callout' | 'contribution') => {
  const { id, profile: { references, tagset, url, description, tagline, displayName, location, visuals }, context } = articable
  const { vision, impact, who } = context || {}
  const { city, country, postalCode } = location || {}

  let article = ``

  if (type !== 'contribution')
    article = `<source>${url}</source>\n<type>${type}</type>\nName: ${displayName}`

  if (tagline) article = `${article}\nTagline: ${tagline}`
  if (tagset?.tags.length) article = `${article}\nTags: ${tagset?.tags.join(', ')}`
  if (description) article = `${article}\nDescription: ${description}`
  if (impact) article = `${article}\nImpact: ${impact}`
  if (vision) article = `${article}\nVision: ${vision}`
  if (who) article = `${article}\nWho: ${who}`

  const processedVisuals = visuals.map((visual: any) => `\t${visual.name}: ${visual.uri}`).join('\n')
  if (processedVisuals) article = `${article}\nVisuals: ${processedVisuals}`

  if (postalCode || city || country) article = `${article}\nLocation: ${postalCode} ${city} ${country}`

  const processedRefs = references.map(({ description, name, uri }: any) =>
    `\tReference name: ${name}\n\tReference description: ${description}\n\tUri: ${uri}\n`
  )
  if (processedRefs) article = `${article}\nReferences:\n${processedRefs}`

  article = `${article}\nURL: ${url}`
  return [id, article]
}

export const digitalTwinDemo = async (tmpDir: string | undefined = undefined) => {
  if (!tmpDir) {
    tmpDir = path.join(__dirname, `data`)
  }

  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const spacesQueryResult = await alkemioCliClient.sdkClient.digitalTwinDemo({
    spaceNameID: 'digileefomgeving',
  });

  const space = spacesQueryResult.data.space;

  const [spaceId, article] = generateArticle(space, 'space')
  fs.writeFileSync(path.join(tmpDir, `space-${spaceId}.txt`), article)


  for (let i = 0; i < (space.challenges || []).length; i++) {
    const challenge = (space.challenges || [])[i]
    const [id, article] = generateArticle(challenge, 'challenge')
    fs.writeFileSync(path.join(tmpDir, `challenge-${id}.txt`), article);

    for (let j = 0; j < (challenge.collaboration?.callouts || []).length; j++) {
      const callout = (challenge.collaboration?.callouts || [])[j]
      let [_, article] = generateArticle(callout.framing, 'callout')

      // extra loop but will do for now
      const contributions = callout.contributions?.filter(
        (article) => !!article.link
      ).map(contribution => {
        const [_, contribArticle] = generateArticle(contribution.link, 'contribution');
        return contribArticle
      }).join('\n')

      if (contributions) article = `${article}\nContributions:\n${contributions}`

      const messages = callout.comments?.messages || []
      const processedMessages = messages.map((message) => {
        let { profile: { displayName: senderName, url: senderUrl } } = message.sender!
        const postedOn = new Date(message.timestamp).toLocaleString("en-US")
        return `\t${senderName} with profile link ${senderUrl} said '${message.message}' on ${postedOn}`
      }).join('\n')

      if (processedMessages) article = `${article}\nMessages:\n${processedMessages}`

      fs.writeFileSync(path.join(tmpDir, `callout-${callout.id}.txt`), article)
    }
  }
};

main().catch(error => {
  console.error(error);
});
