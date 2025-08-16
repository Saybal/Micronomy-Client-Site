import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <img
          className="w-40 lg:w-50"
          src="https://i.ibb.co/TMrPS0h2/f9ba89de-5b50-4e8d-b2bc-0d1068d6b188-removalai-preview.png"
          alt=""
        />
        <p>
          Micronomy Platform
          <br />
          Providing reliable jobs and services since 2015
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/in/saybal-roy/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727v20.546C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.727V1.727C24 .774 23.21 0 22.23 0zM7.08 20.452H3.56V9h3.52v11.452zM5.32 7.53a2.036 2.036 0 110-4.072 2.036 2.036 0 010 4.072zM20.452 20.452h-3.52v-5.605c0-1.337-.026-3.06-1.864-3.06-1.866 0-2.152 1.456-2.152 2.96v5.705H9.4V9h3.38v1.56h.048c.47-.89 1.616-1.83 3.324-1.83 3.556 0 4.208 2.342 4.208 5.387v6.335z"></path>
            </svg>
          </a>

          <a href="https://github.com/Saybal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.932 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <a href="https://web.facebook.com/saybal.roy/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
