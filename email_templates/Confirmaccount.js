// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

const {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} = require("react-email/components");

function Confirmaccount(props) {
  const { url, action_message, header_message } = props;
  return (
    <Html>
      <Head />
      <Preview>Log in with this magic link.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://ibb.co/94b3mCM`}
            width={48}
            height={48}
            alt="Raycast"
          />
          <Heading style={heading}>
            {header_message || "🪄 Your magic link"}
          </Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link style={link} href={url}>
                👉 {action_message || "Click here to sign in"} 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- NaijafoodsuperBasket Team
          </Text>
          <Hr style={hr} />
          <Img
            src={`https://ibb.co/94b3mCM`}
            width={32}
            height={32}
            style={{
              WebkitFilter: "grayscale(100%)",
              filter: "grayscale(100%)",
              margin: "20px 0",
            }}
          />
          <Text style={footer}>Naija_food_superBasket.</Text>
          <Text style={footer}>address bb-bb-bb xx-xx-xx</Text>
        </Container>
      </Body>
    </Html>
  );
}
// `https://ibb.co/94b3mCM`
export default Confirmaccount;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};

/*

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Log in with this magic link.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 25px 48px;background-image:url(&quot;/assets/raycast-bg.png&quot;);background-position:bottom;background-repeat:no-repeat, no-repeat">
      <tbody>
        <tr style="width:100%">
          <td><img alt="Raycast" height="48" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/raycast-logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="48" />
            <h1 style="font-size:28px;font-weight:bold;margin-top:48px">🪄 Your magic link</h1>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin:24px 0">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:26px;margin:16px 0"><a href="https://raycast.com" style="color:#FF6363;text-decoration:none" target="_blank">👉 Click here to sign in 👈</a></p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0">If you didn&#x27;t request this, please ignore this email.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />- Raycast Team</p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dddddd;margin-top:48px" /><img height="32" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/raycast-logo.png" style="display:block;outline:none;border:none;text-decoration:none;-webkit-filter:grayscale(100%);filter:grayscale(100%);margin:20px 0" width="32" />
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px">Raycast Technologies Inc.</p>
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px">2093 Philadelphia Pike #3222, Claymont, DE 19703</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
*/
