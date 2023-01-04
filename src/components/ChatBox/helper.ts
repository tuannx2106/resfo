export const preSanitizeCommentMessage = (text: string) => {
  const MOB_NEW_LINE_REGREX = /<(\/)?div>/g
  const MULTIPLE_BR_TAG_REGREX = /(<br\s*\/?>(\s\s+)?){2,}/gi
  const BR_TAG_BEGIN_REGREX = /^(<br\s*\/?>(\s\s+)?)+/

  let message = text

  // step 1: replace all &nbsp; to empty string
  message = message.replace(/&nbsp;/gi, '').trim()
  // step 2: replace <div><br></div> to <br /><br><br/>
  message = message.replace(MOB_NEW_LINE_REGREX, '<br />')
  // step 3: replace multiple <br> tag to 1 <br>
  message = message.replace(MULTIPLE_BR_TAG_REGREX, '<br />')
  // step 4: replace <br> that begin of comment message to empty string
  message = message.replace(BR_TAG_BEGIN_REGREX, '')

  return message
}
