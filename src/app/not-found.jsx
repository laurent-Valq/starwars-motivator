"use client";

import Link from "next/link";

const NotFound = () => {
    return (
        <div>
            <h2>Page Not Found!</h2>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">Go back to the homepage</Link>
        </div>
  );
};

export default NotFound;