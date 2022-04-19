// NPM Modules
import queryString from 'querystring';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

// Standard modules
import fs from 'fs';

// Local Modules
import config from '../config/variables.config';
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
import * as path from "path";

const { EMAIL } = config;
const {
  WEBSITE_HOST, SERVICE, USERNAME, PASSWORD, ENDPOINTS, TEMPLATES
} = EMAIL;

const mailer = nodemailer.createTransport({
  service: SERVICE,
  auth: { user: USERNAME, pass: PASSWORD }
});

export default class EMailUtil {
  static async sendHtml(from, to, subject, html) {
    const mailOptions = {
      to, from, subject, html
    };
    await mailer.sendMail(mailOptions);
  }

  static async sendForgotPasswordViaGmail(email, expiryDate, key) {
    // console.log({ email, expiryDate, key });
    const query = queryString.stringify({ email, expiryDate, key });
    const confirmationUrl = `${WEBSITE_HOST}${ENDPOINTS.FORGOT_PASSWORD}?${query}`;
    try {
      const html = fs.readFileSync(TEMPLATES.FORGOT_PASSWORD, { encoding: 'utf-8' });
      const template = handlebars.compile(html);
      const htmlToSend = template({ confirmationUrl });
      await EMailUtil.sendHtml(USERNAME, email, 'Forgot Password', htmlToSend);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async sendSignupAccessViaGmail(email, expiryDate, key) {
    // console.log({ email, expiryDate, key });
    const query = queryString.stringify({ email, expiryDate, key });
    const confirmationUrl = `${WEBSITE_HOST}${ENDPOINTS.SIGNUP}?${query}`;
    try {
      const html = fs.readFileSync(TEMPLATES.SIGNUP, { encoding: 'utf-8' });
      const template = handlebars.compile(html);
      const htmlToSend = template({ confirmationUrl });
      await EMailUtil.sendHtml(USERNAME, email, 'Email Confirmation', htmlToSend);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
