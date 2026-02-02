import { lazy } from 'react';
import Terminal from "./Terminal.jsx";
import Safari from "./Safari.jsx";
// Lazy load Resume to defer PDF library loading
const Resume = lazy(() => import("./Resume.jsx"));
import Finder from "./Finder.jsx";
import Text from "./Text.jsx";
import Image from "./Image.jsx";
import Contact from "./Contact.jsx";
import Gallery from "./Gallery.jsx";

export { Terminal, Safari, Resume, Finder, Text, Image, Contact, Gallery };
