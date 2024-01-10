import mail from '@sendgrid/mail';
import core from '@actions/core';

console.log(process.env);

const from = core.getInput('from', { required: true });
const to = core.getInput('to', { required: true });
const subject = core.getInput('subject', { required: true });
const bodyText = core.getInput('body_text') || null;
const bodyHtml = core.getInput('body_html') || null;

if (!bodyText && !bodyHtml) {
    core.setFailed('At least one of body_text or body_html must be provided');
    process.exit(1);
}

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

    if (bodyText) {
        msg.text = bodyText;
    }

    if (bodyHtml) {
        msg.html = bodyHtml;
    }

    const response = await mail.send(msg);

    const messageId = response[0].headers['x-message-id'];

    console.log(`Message sent: ${messageId}`);
    core.setOutput('message_id', messageId);

} catch (error) {
    core.setFailed(error.message);
}

