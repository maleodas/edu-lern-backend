import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../constants/envVariables';
export const sendEmail = async (to, subject, text, html) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to,
    from: 'pankaj@autovyn.in',
    subject,
    text,
    html,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};
