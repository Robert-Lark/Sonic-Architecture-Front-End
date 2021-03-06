import DiscogsLogo from "../../assets/discogsLogo.png";
import {Helmet} from "react-helmet";

import {API_BASE_URL} from "../../API/APIcall";
function Login(props) {
  function authorize() {
    // if (process.env.NODE_ENV === "production") {
    //   alert(
    //     "As of 9/01 This feature is currently in development mode -come back in the next few days"
    //   );
    // } else {
    //   window.location = `${API_BASE_URL}/authorize`;
    // }
    window.location = `${API_BASE_URL}/authorize`;
  }

  return (
    <div className="loginContainerMain">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link
          rel="canonical"
          href="https://sonic-architecture-v1.netlify.app/login"
        />
      </Helmet>
      <img className="discogsLogo" src={DiscogsLogo} alt="discogsLogo" />
      <p>
        sonic architecture uses oauth authentication to access the discogs
        database, discogs is the largest and most comprehensive music database
        on the planet.
      </p>

      <p>
        more than 595,000 people have contributed some piece of knowledge, to
        build up a catalog of more than 14,319,858 recordings and 7,697,070
        artists.
      </p>
      <p>
        by creating an account, or logging in with your existing account, you
        can currate sonic architecture to catalog your favorite record labels
        and releases.
      </p>

      <button onClick={authorize}>Log-in using your discogs account</button>
    </div>
  );
}

export default Login;
