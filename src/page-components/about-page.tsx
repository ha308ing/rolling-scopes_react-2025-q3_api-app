import PageWithHomeLink from '../components/page-with-home-link';

const AboutPage = () => (
  <PageWithHomeLink title="About">
    <section className="section">
      <p className="block">Hello, I&apos;m Ivan! 👋</p>
      <p className="block">
        Let&apos;s connect on{' '}
        <a
          href="https://www.linkedin.com/in/ivan-arkaev/"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
        </a>
      </p>
      <p className="block">
        Check out{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          Rolling Scopes React Course
        </a>
      </p>
    </section>
  </PageWithHomeLink>
);

export default AboutPage;
