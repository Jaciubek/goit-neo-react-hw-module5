import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <Link to="/" className="home-link">Go to HomePage</Link>
    </div>
  );
}

export default NotFoundPage;
