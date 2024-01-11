import mail from '@sendgrid/mail';
import core from '@actions/core';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

const from = core.getInput('from', { required: true });
const to = core.getInput('to', { required: true });
const subject = core.getInput('subject', { required: true });
const bodyText = core.getInput('body_text') || null;
const bodyHtml = core.getInput('body_html') || null;

if (!bodyText && !bodyHtml) {
    core.setFailed('At least one of body_text or body_html must be provided');
    process.exit(1);
}

// Accumulate attachments from inputs
let attachmentsAccumulator = [];
for( const attachment of yaml.parse(core.getInput('attachments'))) {
    attachmentsAccumulator.push(attachment);
}
attachmentsAccumulator.push(core.getInput('attachment'));
const attachments = attachmentsAccumulator.filter(a => a);

const sendgridApiKey = core.getInput('sendgrid_api_key') || process.env.SENDGRID_API_KEY

if(!sendgridApiKey) {
    core.setFailed('An API key must be provided');
    process.exit(1);
}

mail.setApiKey(sendgridApiKey);

try {
    let msg = {
        to,
        from,
        subject,
    };

    //Add body text
    if (bodyText) {
        msg.text = bodyText;
    }

    //Add body html
    if (bodyHtml) {
        msg.html = bodyHtml;
    }

    //Add attachments if present
    if(attachments) {
        msg.attachments = [];
        for(const attachment of attachments) {
            msg.attachments.push({
                content: fs.readFileSync(attachment).toString('base64'),
                filename: path.basename(attachment),
                type: mime.getType(attachment),
                disposition: 'attachment'
            });
        }
    }

    const response = await mail.send(msg);

    const messageId = response[0].headers['x-message-id'];

    console.log(`Message sent: ${messageId}`);
    core.setOutput('message_id', messageId);

} catch (error) {
    core.setFailed(error.message);
}

