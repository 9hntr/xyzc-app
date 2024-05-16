import { siteConfig } from "@/siteConfig";
import Link from "next/link";
import React from "react";

const Terms = () => {
  return (
    <div className="mt-[15vh] flex min-h-screen w-full flex-col items-center justify-center">
      <span className="absolute left-0 top-0 ml-6 mt-6">
        <Link href="/" className="text-muted-foreground">
          ← go back
        </Link>
      </span>
      <div className="max-w-4xl p-6 text-justify md:p-10">
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Description of the service
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            {siteConfig.appName} is a platform designed to allow anyone to
            register and customize a page. Creators may personalize the page
            with images, text and video and use the page to facilitate the
            acceptance of Monetary Donations in the symbolic form of
            &quot;Coffees&quot; and other forms of Creator content, which will
            be collectively referred to as &quot;Creator Content&quot;
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Acceptance of terms
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            By accessing the {siteConfig.appName} platform, you agree to be
            bound by these terms and conditions of use and agree that you are
            responsible for compliance with applicable local laws. If you do not
            agree to any of these terms, you are prohibited from using or
            accessing this site.
            <br />
            <br />
            The materials contained on this platform are protected by applicable
            copyright and trademark laws.
            <br />
            <br />
          </p>
          <p className="text-sm text-gray-600 md:text-lg">
            A Creator is defined as someone who registers an{" "}
            {siteConfig.appName} page or uses the platform in any way to solicit
            donations, messages, post content and sell content or creator
            memberships. As a Creator, you are solely responsible for all text,
            images, videos, links and other content you create, upload, post,
            publish, publish or display with {siteConfig.appName}.
            <br />
            <br />
            As a Creator, whenever you make use of a feature that allows you to
            upload content to our site or contact other users of our site, you
            warrant that you have the necessary authorization to provide this
            information. You will be liable to us and indemnify us for any
            breach of that warranty. This means that you will be liable for any
            loss or damage we suffer as a result of your breach of warranty.
            <br />
            <br />
            Any content you upload to our website will be considered
            non-confidential and non-proprietary. You retain all of your
            ownership rights in your content, but you grant us and other users
            of our site a limited license to use, store and copy that content
            and to distribute and make it available to others. We may use this
            content to improve our site and our business without liability to
            you.
            <br />
            <br />
            You also grant us the right to disclose your identity to any third
            party who claims that any content posted or uploaded by you to our
            site constitutes a violation of their intellectual property rights
            or their right to privacy.
            <br />
            <br />
            We have the right to verify and remove any content or postings you
            make on our site if, in our opinion, this is reasonably necessary to
            protect our business.
            <br />
            <br />
            As a Creator, you agree to become a data controller, personally
            responsible for the lawful processing of any information provided to
            you on {siteConfig.appName}, for example, email addresses of
            supporters or names and addresses of purchasers of goods or services
            you sell on {siteConfig.appName}. You will only use information
            about Supporters (including, but not limited to, donors, supporters,
            purchasers, subscribers) to communicate with Supporters in
            connection with their interactions with you on {siteConfig.appName}{" "}
            and in a lawful manner. You must provide Contributors with a way to
            withdraw their consent to the processing of their information,
            remove their data from your records, and comply with all legal
            requirements for the processing of personal information that{" "}
            {siteConfig.appName} makes available to you.
            <br />
            <br />
            To register a &quot;Creator&quot; account, you must be at least 18
            years old.
            <br />
            <br />
            You are prohibited from using the {siteConfig.appName} platform,
            service or site in connection with any of the following:
            <br />
            <br />
            Any activity that violates any governmental law or regulation,
            industry requirements or money laundering regulation. Anything
            prohibited by payment providers connected to the platform such as
            MercadoPago. For the avoidance of doubt, acceptable use and
            prohibited activities can be found in Content including but not
            limited to; Adult or sexually explicit content including but not
            limited to:
            <ul className="list-disc">
              <li>Pornography, nudity and any other obscene content.</li>
              <li>
                Literature, images, videos, links to external sites or content
                containing such material.
              </li>
              <li>
                Sexual services such as prostitution, escorts, pay-per-view,
                adult live chat features.
              </li>
              <li>
                Content that includes links to and from the platform that is
                fraudulent, misleading, inaccurate or dishonest.
              </li>
              <li>Content that is violent.</li>
              <li>
                Hate speech, intimidation or abuse of any kind directed at any
                individual, group or institution.
              </li>
              <li>
                Abuse of any kind directed at any individual, group or
                institution.
              </li>
              <li>
                Activity purposely designed to harm the Creator in any way,
                including financial harm through tactics such as chargebacks or
                fraudulent disputes.
              </li>
            </ul>
            <br />
            Products or services that directly infringe or facilitate the
            infringement of any third party&apos;s trademark, patent, copyright,
            trade secret, or proprietary or privacy rights; Raffles, lotteries,
            sweepstakes or games of chance in which a fee is paid to participate
            and winners are selected at random; Any other activity that{" "}
            {siteConfig.appName}
            may, in its sole discretion, deem unacceptable.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Terms;
