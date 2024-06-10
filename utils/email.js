/* eslint-disable space-before-function-paren */
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../config.env" });
const HTML = require("../email_templates/html_template.js");

module.exports = class Email {
  #transporter() {
    return nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      // port: 587,
      // secure: false,
      service: "Zoho",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.ZOHO_USERNAME,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
  }

  async #sendMail(to, subject, url, action_message, header_message) {
    return await this.#transporter().sendMail({
      from: "naijaFoodSuperBasket <naijafoodsuperbasket@zohomail.com>", // sender address
      to, // list of receivers
      subject, // Subject line
      text: action_message, // plain text body
      html: HTML(url, action_message, header_message),
      //   render(Confirmaccount({ url, action_message, header_message })), // html body
    });
  }

  async sendAccountConfirmationMessage(
    to,
    subject,
    url,
    action_message = "Click here to confirm your account",
    header_message = "Confirm your account"
  ) {
    return this.#sendMail(to, subject, url, action_message, header_message);
  }

  async sendResetPassword(
    to,
    subject,
    url,
    action_message = "Click here to reset your password",
    header_message = "Reset your password"
  ) {
    console.log(url);
    return this.#sendMail(to, subject, url, action_message, header_message);
  }
};

// confirm account
// reset password
// order confirmation
// const app = new Email().sendResetPassword();
