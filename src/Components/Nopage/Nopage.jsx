import "./Nopage.css";

function Nopage() {
  return (
    <div className="nocon">
      <div className="nopagecard">
        <h1 className="errorcode">404</h1>
        <h2 className="nopage">Page Not Found</h2>
        <p className="noparagraph">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <a href="/" className="homebtn">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default Nopage;