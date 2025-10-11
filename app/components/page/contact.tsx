import React, { useEffect } from "react";
import { Contact as TempContact } from "dev-portfolio";
import type { AboutMeInfoPropsType } from "dev-portfolio/dist/common/types/ComponentTypes/Contact/AboutMeInfoType";
import type { ChannelType } from "dev-portfolio/dist/common/types/ComponentTypes/ChannelType";

function Contact() {
  const channels: ChannelType[] = [
    {
      redirectUrl: "https://www.linkedin.com/in/samuel-chan-446161217/",
      name: "linkedin",
      color: "#0766C2",
      size: "24px",
    },
    {
      redirectUrl: "https://www.instagram.com/samuel_chan_hin/",
      name: "instagram",
      size: "24px",
    },
    {
      redirectUrl: "https://www.youtube.com/channel/UCN4ZaevMOZnJCmjbt4XVclQ",
      name: "youtube",
      color: "#FF0034",
      size: "24px",
    },
    {
      redirectUrl: "https://www.facebook.com/samuel.chan.79",
      name: "facebook",
      color: "#0967FF",
      size: "24px",
    },
  ];
  const aboutMeInfos: AboutMeInfoPropsType[] = [
    { title: "Where I live", description: "Hong Kong" },
    {
      title: "Give me a call",
      description: "(+852) 61267943",
    },
    {
      title: "Or, why don't you email me?",
      description: "samuel1995714@gmail.com",
    },
  ];

  useEffect(() => {
    // override library to open new page
    document
      .querySelectorAll("#contact a")
      .forEach((ele) => ele.setAttribute("target", "_blank"));
  }, []);

  return (
    <div className="text-black" id="contact">
      <TempContact
        title="Hello My name is Samuel"
        subTitle="If you're interested in me, please press the button below"
        buttonText="Want to work with me?"
        email="samuel1995714@gmail.com"
        channels={channels}
        aboutMeInfos={aboutMeInfos}
      />
    </div>
  );
}

export default Contact;
