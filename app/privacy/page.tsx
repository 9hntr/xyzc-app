import { siteConfig } from "@/siteConfig";
import Link from "next/link";
import React from "react";

const Privacy = () => {
  return (
    <div className="mt-[15vh] flex min-h-screen w-full flex-col items-center">
      <span className="absolute left-0 top-0 ml-6 mt-6">
        <Link
          href="/"
          className="text-muted-foreground transition duration-700"
        >
          ← go back
        </Link>
      </span>
      <div className="max-w-4xl p-6 text-justify md:p-10">
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            This is our Privacy Policy. This policy sets forth the terms under
            which {siteConfig.appName} uses and protects the information that
            you provide to us when you use this website. This company is
            committed to the security of its user&apos;s data. When we ask you
            to provide personal information by which you can be identified, we
            do so with the assurance that it will only be used in accordance
            with the terms of this document. However, this Privacy Policy may
            change over time or be updated and we encourage you to continually
            review this page to ensure that you agree to any such changes.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Gathered Data
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            Our Web site may collect personal information such as your Name and
            contact information such as your email address and demographic
            information. demographic information. Also, when necessary, specific
            information may be specific information may be required to process
            an order or make a delivery or billing.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Gathered Data Usage
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            Our web site uses the information in order to provide the best
            possible service, particularly to the best possible service,
            particularly to maintain a record of users, orders if of users, of
            orders if applicable, and to improve our products and services.
            products and services. We may send periodic e-mails through our site
            may be sent periodically through our site with special offers, new
            products and other special offers, new products and other
            promotional information that we deem may be sent periodically
            through our site with special offers, new products and other
            advertising information that we consider relevant to you or that may
            be of benefit to you. these emails will be sent to the address you
            provide and may be unsubscribed from address you provide and may be
            unsubscribed at any time. {siteConfig.appName} is highly committed
            to fulfilling its commitment to keep your information commitment to
            keeping your information secure. We use state-of-the-art systems
            systems and constantly update them to ensure that there is no
            unauthorized access. there is no unauthorized access.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Cookies
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            A cookie refers to a file that is sent with the purpose of
            requesting permission to be stored on your computer, by accepting
            this file is created and the cookie is then used to have information
            regarding web traffic, and also facilitates future visits to a
            recurring website. Another function that cookies have is that with
            them the web can recognize you individually and therefore provide
            you with the best personalized service on its website.
            <br />
            Our website uses cookies to identify the pages that are visited and
            their frequency. This information is used only for statistical
            analysis and then the information is permanently deleted. You can
            delete cookies at any time from your computer. However, cookies help
            provide a better service from websites, they do not give access to
            information from your computer or from you, unless you choose to
            provide it directly to us. You can accept or deny the use of
            cookies, however most browsers automatically accept cookies as it
            serves to have a better web service. You can also change the
            settings on your computer to decline cookies. If you decline cookies
            you may not be able to use some of our services.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Third party links
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            This website may contain links to other sites that may be of
            interest to you. Once you click on these links and leave our site,
            we no longer have control over the site to which you are redirected
            and therefore we are not responsible for the terms or privacy or
            data protection practices of such other sites. Those sites are
            subject to their own privacy policies and we recommend that you
            check with them to confirm that you agree with them.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text-md mb-2 font-bold text-primary md:text-2xl">
            Personal data control
          </h1>
          <p className="text-sm text-gray-600 md:text-lg">
            This company will not sell, lease or distribute the personal
            information that is collected without your personal information that
            is collected without your consent, unless required by a court
            required by a judge with a court order.
          </p>
          <br />
          <p className="text-xs text-gray-600 md:text-lg">
            {siteConfig.appName} reserves the right to change the terms of this
            Privacy Policy at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
