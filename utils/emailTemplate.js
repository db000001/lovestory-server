import questionnareData from "../data/data.js";

export const verifyEmailHTMLByTokenLink = (verificationUrl) =>
  `
  <div
  style="
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f5f5f5;
  "
>
  <img
    src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
    style="height: 50px;"
  />
  <h2>Confirm your email address</h2>

  <a
    href="${verificationUrl}"
    style="
      background-color: #1f883d !important;
      box-sizing: border-box;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      font-size: inherit;
      font-weight: 500;
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
      padding: 0.75em 1.5em;
      border: 1px solid #1f883d;
    "
    >Confirm Your Email →</a
  >
  <h3>Alternatively, please paste the following link into your browser:</h3>

  <a href="${verificationUrl}">${verificationUrl}</a>

  <h3>
    If you have any questions, please send an email to support@lovestory.ai
  </h3>

  <p>Thanks,</p>
  <p>Love Story Team</p>

  <h3>Questions about Love Story? Check out our FAQs</h3>

  <p>Sent with care from</p>
  <p>Love Story Inc.</p>
  <p>108 W. 13th Street, Suite 100</p>
  <p>Wilminton, Delaware 19801</p>
  <div class="w-layout-grid footer9_legal-list">
    <a
      class="footer_link w-inline-block"
      href="https://www.tiktok.com/@lovestory.ai"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.x.com/lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.youtube.com/@lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.facebook.com/profile.php?id=61555479261617"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</div>
  `;

export const resetPwdEmailHTML = (resetPasswordUrl) =>
  `
  <div
  style="
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f5f5f5;
  "
>
  <img
    src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
    style="height: 50px;"
  />
  <h2>Reset your password</h2>

  <a
    href="${resetPasswordUrl}"
    style="
      background-color: #1f883d !important;
      box-sizing: border-box;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      font-size: inherit;
      font-weight: 500;
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
      padding: 0.75em 1.5em;
      border: 1px solid #1f883d;
    "
    >Confirm Your Email →</a
  >
  <h3>Alternatively, please paste the following link into your browser:</h3>

  <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>

  <h3>
    If you have any questions, please send an email to support@lovestory.ai.
  </h3>

  <p>Thanks,</p>
  <p>Love Story Team</p>

  <h3>Questions about Love Story? Check out our FAQs.</h3>

  <p>Sent with care from</p>
  <p>Love Story Inc.</p>
  <p>108 W. 13th Street, Suite 100</p>
  <p>Wilminton, Delaware 19801</p>
  <div class="w-layout-grid footer9_legal-list">
    <a
      class="footer_link w-inline-block"
      href="https://www.tiktok.com/@lovestory.ai"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.x.com/lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.youtube.com/@lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.facebook.com/profile.php?id=61555479261617"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</div>

  
  `;

export const approvedMatchEmailHTML = (
  matchedUserName,
  matchedUserAvatar,
  matchedUserAge,
  score,
  summary
) =>
  `
  <div
  style="
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f5f5f5;
  "
  >
  <img
    src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
    style="height: 50px;"
  />
  <h2>You and ${matchedUserName} approved the match on Love Story!</h2>

  <p>Congratulations on your match! Start chatting and discover your connection on Love Story!</p>

  <div style="display: flex;">
    <img
      src="${matchedUserAvatar}"
      style="width: 50px; height: 50px; display: block; border-radius: 50%; object-fit: cover; margin-right: 20px;"
    />
    <p><b>${matchedUserName} ${matchedUserAge}</b></p>
  </div>
  <p>Confidence level: ${score}</p>
  <p>${summary ? summary : ""}</p>

  <a
    href="https://app.lovestory.ai"
    style="
      background-color: #1f883d !important;
      box-sizing: border-box;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      font-size: inherit;
      font-weight: 500;
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
      padding: 0.75em 1.5em;
      border: 1px solid #1f883d;
    "
    >View on Love Story →</a
  >
  <p>Thanks,</p>
  <p>Love Story Team</p>

  <h3>Questions about Love Story? Check out our FAQs.</h3>

  <p>Sent with care from</p>
  <p>Love Story Inc.</p>
  <p>108 W. 13th Street, Suite 100</p>
  <p>Wilminton, Delaware 19801</p>
  <div class="w-layout-grid footer9_legal-list">
    <a
      class="footer_link w-inline-block"
      href="https://www.tiktok.com/@lovestory.ai"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.x.com/lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.youtube.com/@lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.facebook.com/profile.php?id=61555479261617"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</div>

  
  `;

export const addMatchesEmailHTML = (
  matchedUserName,
  matchedUserAvatar,
  matchedUserAge,
  score,
  summary
) =>
  `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>Someone matched with you on Love Story!</h2>
  
    <p>Congratulations on your match! Start chatting and discover your connection on Love Story!</p>
  
    <div style="display: flex;">
      <img
        src="${matchedUserAvatar}"
        style="width: 50px; height: 50px; display: block; border-radius: 50%; object-fit: cover; margin-right: 20px;"
      />
      <h3>${matchedUserName} ${matchedUserAge}</h3>
    </div>
      <p>Confidence level: ${score}</p>
      <p>${summary ? summary : ""}</p>
  
    <a
      href="https://app.lovestory.ai"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
  
    
    `;

export const declinedMatchEmailHTML = (
  matchedUserName,
  matchedUserAvatar,
  age,
  score
) =>
  `
  <div
  style="
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f5f5f5;
  "
  >
  <img
    src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
    style="height: 50px;"
  />
  <h2>Unfortunately, the match with ${matchedUserName} was declined or expired</h2>

  <p>Not every match is meant to be, but your perfect connection is still out there. Keep exploring, and don’t lose hope!</p>

  <div style="display: flex;">
    <img
      src="${matchedUserAvatar}"
      style="width: 50px; height: 50px; display: block; border-radius: 50%; object-fit: cover; margin-right: 20px;"
    />
    <div>
      <p><b>${matchedUserName} ${age}</b></p>
    </div>
  </div>
  <p>Confidence level: ${score}</p>

  <a
    href="https://app.lovestory.ai"
    style="
      background-color: #1f883d !important;
      box-sizing: border-box;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      font-size: inherit;
      font-weight: 500;
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
      padding: 0.75em 1.5em;
      border: 1px solid #1f883d;
    "
    >View on Love Story →</a
  >
  <p>Thanks,</p>
  <p>Love Story Team</p>

  <h3>Questions about Love Story? Check out our FAQs.</h3>

  <p>Sent with care from</p>
  <p>Love Story Inc.</p>
  <p>108 W. 13th Street, Suite 100</p>
  <p>Wilminton, Delaware 19801</p>
  <div class="w-layout-grid footer9_legal-list">
    <a
      class="footer_link w-inline-block"
      href="https://www.tiktok.com/@lovestory.ai"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.x.com/lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.youtube.com/@lovestoryapp"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
    <a
      class="footer_link w-inline-block"
      href="https://www.facebook.com/profile.php?id=61555479261617"
      target="_blank"
    >
      <div class="icon-embed-xsmall w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
            fill="CurrentColor"
          ></path>
        </svg>
      </div>
    </a>
  </div>
</div>

  
  `;

export const reigniteMatchEmailHTML = (matchedUserName, age) =>
  `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>You've successfully purchased Reignite.</h2>
    <p>${matchedUserName} ${age}</p>
  
    <p>Congratulations, you’ve successfully reignited your match with ${matchedUserName} ${age} and you now have another chance to connect.</p>
  
    <a
      href="https://app.lovestory.ai"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
`;

export const informationPurchaseEmailHTML = (
  matchedUserName,
  matchedUserAge,
  purchasedQuestions,
  revenueQuestions
) => {
  let changedQuestionList = "";
  let totalPrice = 0;
  purchasedQuestions.forEach((question) => {
    const newAnswer = getAnswerFromQuestion(
      revenueQuestions,
      question.qIndex,
      question.sIndex,
      question.pIndex
    );
    totalPrice += Number(question.price);
    changedQuestionList += `<p><b>${question.title}</b> $${Number(
      question.price
    ).toFixed(2)}</p><p>Answer: ${newAnswer}</p>`;
  });

  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>You've successfully purchased ${matchedUserName} ${matchedUserAge}'s answers!</h2>
  
    ${changedQuestionList}

    <p>Congratulations! You've successfully purchased your match's response. Discover more about what makes your match
      special, and find out if you're truly compatible.</p>

    <p>Your perfect connection might be right here!</p>
  
    <a
      href="https://app.lovestory.ai"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

export const subscriptionPurchaseEmailHTML = (duration, cost, start, end) => {
  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>Welcome to Love Story Premium</h2>
  
    <p>${duration} ${duration === 1 ? "month" : "months"} $${cost.toFixed(
    2
  )}</p>
    <p>${start} to ${end}</p>

    <p>Congratulations, you now have access to Love Story Premium. As a subscriber, you enjoy faster matches, match filtering, 
    ability to purchase more matched user information, and an ad-free experience.</p>

    <p>Your perfect connection might be right here!</p>
  
    <a
      href="https://app.lovestory.ai/settings-subscription"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

export const subscriptionCancelEmailHTML = (endDate) => {
  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>Your Love Story Premium subscription has been canceled.</h2>

    <p>We're sorry to see you go! Your subscription has been successfully canceled, and your Premium access will end on ${endDate}. 
    You can still enjoy Premium features until then.</p>
  
    <a
      href="https://app.lovestory.ai/settings-subscription"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

export const cashOutRequestEmailHTML = (
  paypal,
  venmo,
  cashApp,
  address,
  city,
  state,
  zip,
  amount
) => {
  const paypalAddress = paypal ? `<p>PayPal Email: ${paypal}</p>` : "";
  const venmoAddress = venmo ? `<p>Venmo Username: ${venmo}</p>` : "";
  const cashAppAddress = cashApp ? `<p>Cash App Username: ${cashApp}</p>` : "";
  const addressText = `<p>${address} ${city} ${state} ${zip}</p>`;
  const amountText = `<p>$${amount.toFixed(2)}</p>`;
  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>You've requested to withdraw $${amount.toFixed(
      2
    )} from your account balance.</h2>

    ${paypalAddress}
    ${venmoAddress}
    ${cashAppAddress}
    ${addressText}
    ${amountText}
  
    <a
      href="https://app.lovestory.ai/settings-subscription"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

export const addMoneyEmailHTML = (amount) => {
  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>You've added $${amount.toFixed(
      2
    )} to your Love Story account balance.</h2>
  
    <a
      href="https://app.lovestory.ai/settings-subscription"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

export const someonePurchasedEmailHTML = (total) =>
  `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>Someone purchased your questionnaire information!</h2>

    <p>Great news—someone is interested in knowing you better! A Love Story user you matched with has purchased access to your
     questionnaire responses.</p>

    <p>Revenue share: $${total}</p>

    <p>Your perfect connection might be closer than you think!</p>
  
    <a
      href="https://app.lovestory.ai"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;

export const newCommentEmailHTML = (age, sex, college, avatar, comment) =>
  `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <h2>${age}${
    sex === "male" ? "M" : sex === "female" ? "F" : "I"
  } at ${college} replied to you.</h2>
  
    <img
      src="${avatar}"
      style="width: 50px; height: 50px; display: block; border-radius: 50%; object-fit: cover; margin-right: 20px;"
    />

    <p>${comment}</p>
  
    <a
      href="https://app.lovestory.ai"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;

export const chatEmailHTML = (userName, userAvatar, messages) => {
  let imageMessageElement = "";
  messages.map((message) => {
    if (message.imageUrl && message.imageUrl != "") {
      imageMessageElement += `<p><img
                  src="${message.imageUrl}"
                  style="max-height: 380px;"
                /></p>`;
    } else {
      imageMessageElement += `<p>${message.content}</p>`;
    }
  });

  return `
      <div
      style="
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f5f5f5;
      "
      >
      <img
        src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
        style="height: 50px;"
      />
      <p><b>${userName} sent you a new message.</b></p>
      <p>Here's your new message from ${userName} - don't forget to reply on Love Story!</p>

      <div
        style="display: flex; align-items: center;"
      >
        <img
          src="${userAvatar}"
          style="width: 50px; height: 50px; display: block; border-radius: 50%; object-fit: cover; margin-right: 20px;"
        />

        <span><b>${userName}</b></span>
      </div>
  
      ${imageMessageElement}
    
      <a
        href="https://app.lovestory.ai/chats"
        style="
          background-color: #1f883d !important;
          box-sizing: border-box;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          font-size: inherit;
          font-weight: 500;
          line-height: 1.5;
          white-space: nowrap;
          vertical-align: middle;
          border-radius: 0.5em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
            Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
          padding: 0.75em 1.5em;
          border: 1px solid #1f883d;
        "
        >Reply on Love Story →</a>

      <p>Thanks,</p>
      <p>Love Story Team</p>
    
      <h3>Questions about Love Story? Check out our FAQs.</h3>
    
      <p>Sent with care from</p>
      <p>Love Story Inc.</p>
      <p>108 W. 13th Street, Suite 100</p>
      <p>Wilminton, Delaware 19801</p>
      <div class="w-layout-grid footer9_legal-list">
        <a
          class="footer_link w-inline-block"
          href="https://www.tiktok.com/@lovestory.ai"
          target="_blank"
        >
          <div class="icon-embed-xsmall w-embed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              class="iconify iconify--simple-icons"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
              ></path>
            </svg>
          </div>
        </a>
        <a
          class="footer_link w-inline-block"
          href="https://www.x.com/lovestoryapp"
          target="_blank"
        >
          <div class="icon-embed-xsmall w-embed">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
                fill="CurrentColor"
              ></path>
            </svg>
          </div>
        </a>
        <a
          class="footer_link w-inline-block"
          href="https://www.youtube.com/@lovestoryapp"
          target="_blank"
        >
          <div class="icon-embed-xsmall w-embed">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
                fill="CurrentColor"
              ></path>
            </svg>
          </div>
        </a>
        <a
          class="footer_link w-inline-block"
          href="https://www.facebook.com/profile.php?id=61555479261617"
          target="_blank"
        >
          <div class="icon-embed-xsmall w-embed">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
                fill="CurrentColor"
              ></path>
            </svg>
          </div>
        </a>
      </div>
    </div>
      `;
};

const findItem = (item, wrapper) => {
  return wrapper.find(
    (existingItem) =>
      existingItem.qIndex === item.qIndex &&
      existingItem.sIndex === item.sIndex &&
      existingItem.pIndex === item.pIndex &&
      existingItem.gIndex === item.gIndex
  );
};

const formatDate = (dateString) => {
  if (!dateString || dateString === "") return "";

  const date = new Date(dateString); // Parse the date string

  // Use UTC getters to avoid timezone shift
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${month}/${day}/${year}`; // MM/DD/YYYY
};

export const userQuestionCompletedEmailHTML = (
  qa,
  email,
  firstName,
  middleName,
  lastName
) => {
  let questions = [];
  let answers = [];

  questionnareData.map((questionnaire, qindex) =>
    questionnaire.sections.map((section, sindex) =>
      section.parts.map((part, index) => {
        let newItem = {
          qIndex: qindex,
          sIndex: sindex,
          pIndex: index,
          gIndex: 0,
          answer: "",
          toggle: false,
        };
        let existItem = findItem(newItem, qa);
        const title = part.questionEmail;

        let answer = existItem ? existItem.answer : "";

        if (part.optionGroups.length > 0) {
          const answerGroup = [];
          for (let gindex = 0; gindex < part.optionGroups.length; gindex++) {
            newItem = {
              qIndex: qindex,
              sIndex: sindex,
              pIndex: index,
              gIndex: gindex,
              answer: "",
              toggle: false,
            };
            existItem = findItem(newItem, qa);

            if (existItem && existItem.answer !== "") {
              answerGroup.push(existItem.answer);
            }
          }

          answer = answerGroup.join("; ");
        }

        if (part.inputGroups.length > 0) {
          const answerGroup = [];

          if (part.id === "q_percent_ethnicity") {
            for (let gindex = 0; gindex < part.inputGroups.length; gindex++) {
              newItem = {
                qIndex: qindex,
                sIndex: sindex,
                pIndex: index,
                gIndex: gindex,
                answer: "",
                toggle: false,
              };
              existItem = findItem(newItem, qa);

              if (existItem && existItem.answer !== "") {
                answerGroup.push(existItem.answer);
              }

              if (part.id === "q_percent_ethnicity") {
                if (!existItem || existItem.answer === "")
                  answerGroup.push("0");
              }
            }
          } else {
            for (let gindex = 0; gindex < part.optionGroups.length; gindex++) {
              newItem = {
                qIndex: qindex,
                sIndex: sindex,
                pIndex: index,
                gIndex: gindex,
                answer: "",
                toggle: false,
              };
              existItem = findItem(newItem, qa);

              if (existItem && existItem.answer !== "") {
                answerGroup.push(existItem.answer);
              }
            }
          }

          answer = answerGroup.join("; ");
        }

        if (part.textMaxCount > 0) {
          const answerGroup = [];

          for (let i = 0; i < part.textMaxCount; i++) {
            newItem = {
              qIndex: qindex,
              sIndex: sindex,
              pIndex: index,
              gIndex: i,
              answer: "",
              toggle: false,
            };
            existItem = findItem(newItem, qa);

            if (existItem && existItem.answer !== "") {
              answerGroup.push(existItem.answer);
            }
          }

          answer = answerGroup.join("; ");
        }

        if (part.id === "q_birthdate" && existItem) {
          answer = formatDate(existItem.answer);
        }

        if (part.id === "q_body_type" && answer.length > 0) {
          // Get the answer and split into type and value
          const answerParts = answer.split("-");
          const type = answerParts[0]; // 'm', 'f', or other
          const value = answerParts[1]; // option value

          // Determine which optionGroup to use
          let groupIndex;
          if (type === "m") groupIndex = 0;
          else if (type === "f") groupIndex = 1;
          else groupIndex = 2;

          // Find index of the value in the right options array
          const options = part.optionGroups[groupIndex].options;
          const index = options.indexOf(value) + 1;

          // Set answer as Type + index (uppercase type)
          answer = `${type.toUpperCase()}${index}`;
        } else if (part.id === "q_body_type_attracted") {
          const answerArray = answer.split("#");
          answer = "";
          answerArray.map((answerVal, idx) => {
            const answerParts = answerVal.split("-");
            const type = answerParts[0]; // 'm', 'f', or other
            const value = answerParts[1]; // option value

            // Determine which optionGroup to use
            let groupIndex;
            if (type === "m") groupIndex = 0;
            else if (type === "f") groupIndex = 1;
            else groupIndex = 2;

            // Find index of the value in the right options array
            const options = part.optionGroups[groupIndex].options;
            const index = options.indexOf(value) + 1;

            // Set answer as Type + index (uppercase type)
            answer += `${type.toUpperCase()}${index}`;

            if (idx < answerArray.length - 1) {
              answer += "; ";
            }
          });
        }
        answer = answer.replace(/#/g, "; ");

        answers.push(answer);
        questions.push(title);
      })
    )
  );

  let answerElements = "";
  answers.forEach((answer) => {
    answerElements += `<td>${answer}</td>`;
  });
  let questionElements = "";
  questions.forEach((q, idx) => {
    questionElements += `<td>${idx + 1}. ${q}</td>`;
  });

  const userQuestionTable = `
    <style>
      table.question-table {
        border-collapse: collapse;
        width: 100%;
      }
      table.question-table th,
      table.question-table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
      }
    </style>
  
    <table class="question-table">
      <thead>
        <tr>
          ${questionElements}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${answerElements}
        </tr>
      </tbody>
    </table>
  `;

  const today = new Date();
  const formattedDate = `${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")}/${String(
    today.getFullYear()
  )}`;

  return `
        <div
        style="
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #fff;
        "
        >
        <img
          src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
          style="height: 50px;"
        />
        <p><b>${email} ${firstName} ${middleName} ${lastName} Registration on ${formattedDate} </b></p>
      
        ${userQuestionTable}
      
        <div class="w-layout-grid footer9_legal-list">
          <a
            class="footer_link w-inline-block"
            href="https://www.tiktok.com/@lovestory.ai"
            target="_blank"
          >
            <div class="icon-embed-xsmall w-embed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                class="iconify iconify--simple-icons"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
                ></path>
              </svg>
            </div>
          </a>
          <a
            class="footer_link w-inline-block"
            href="https://www.x.com/lovestoryapp"
            target="_blank"
          >
            <div class="icon-embed-xsmall w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
                  fill="CurrentColor"
                ></path>
              </svg>
            </div>
          </a>
          <a
            class="footer_link w-inline-block"
            href="https://www.youtube.com/@lovestoryapp"
            target="_blank"
          >
            <div class="icon-embed-xsmall w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
                  fill="CurrentColor"
                ></path>
              </svg>
            </div>
          </a>
          <a
            class="footer_link w-inline-block"
            href="https://www.facebook.com/profile.php?id=61555479261617"
            target="_blank"
          >
            <div class="icon-embed-xsmall w-embed">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
                  fill="CurrentColor"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
        `;
};

export const informationUpdateEmailHTML = (qa, shopItems) => {
  const changedQuestionList = "";
  let totalPrice = 0;
  shopItems.forEach((question) => {
    const newAnswer = getAnswerFromQuestion(
      qa,
      question.qIndex,
      question.sIndex,
      question.pIndex
    );
    totalPrice += Number(question.price);
    changedQuestionList += `<p>${question.title} ${question.price}</p><p>New answer: ${newAnswer}</p>`;
  });

  return `
    <div
    style="
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
    "
    >
    <img
      src="https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/HORIZONTAL_LOGO_3%402x.png"
      style="height: 50px;"
    />
    <p><b>You've successfully updated your answers!</b></p>
  
    ${changedQuestionList}
    <p>$${totalPrice.toFixed(2)}</p>

    <p>Congratulations! You've successfully updated your Love Story answers. Your profile will now reflect these new changes, 
    helping you find the most compatible matches.</p>
  
    <a
      href="https://app.lovestory.ai/settings-information"
      style="
        background-color: #1f883d !important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        vertical-align: middle;
        border-radius: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
        padding: 0.75em 1.5em;
        border: 1px solid #1f883d;
      "
      >View on Love Story →</a
    >
    <p>Thanks,</p>
    <p>Love Story Team</p>
  
    <h3>Questions about Love Story? Check out our FAQs.</h3>
  
    <p>Sent with care from</p>
    <p>Love Story Inc.</p>
    <p>108 W. 13th Street, Suite 100</p>
    <p>Wilminton, Delaware 19801</p>
    <div class="w-layout-grid footer9_legal-list">
      <a
        class="footer_link w-inline-block"
        href="https://www.tiktok.com/@lovestory.ai"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="iconify iconify--simple-icons"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.x.com/lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.youtube.com/@lovestoryapp"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
      <a
        class="footer_link w-inline-block"
        href="https://www.facebook.com/profile.php?id=61555479261617"
        target="_blank"
      >
        <div class="icon-embed-xsmall w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
              fill="CurrentColor"
            ></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
    `;
};

const getAnswerFromQuestion = (jsonQAs, qindex, sindex, pindex) => {
  const existingResults = jsonQAs.filter(
    (json) =>
      json.sIndex === sindex && json.qIndex === qindex && json.pIndex === pindex
  );

  existingResults.sort((a, b) => {
    return a.gIndex - b.gIndex; // Sort in ascending order
  });

  const totalInputs =
    existingResults.length > 0
      ? Math.max(...existingResults.map((result) => result.gIndex)) + 1
      : -1; // Returns -1 if no results

  if (totalInputs === -1) return "";

  let answer = "#".repeat(totalInputs);
  const answerArray = answer.split("");

  existingResults.forEach((result, index) => {
    // Check if the current index is the last one in the existingResults array
    if (index === existingResults.length - 1) {
      // If it's the last result, add without the '#'
      answerArray[result.gIndex] = result.answer; // No '#' added
    } else {
      // For other results, add with '#'
      answerArray[result.gIndex] = result.answer + "#";
    }
  });

  answer = answerArray.join("");

  while (answer.endsWith("#")) {
    answer = answer.slice(0, -1); // Remove the last character
  }

  return answer;
};
