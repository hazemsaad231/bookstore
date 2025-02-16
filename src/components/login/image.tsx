import { useState, useEffect } from "react";
import img from "../../assets/img/img.jpeg";

const Image = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        });
        observer.observe(document.getElementById("lazy-image")!);
        return () => observer.disconnect();
    }, []);

    return (
        <img
            id="lazy-image"
            src={isVisible ? img : ""}
            alt=""
            className="hidden sm:hidden md:block lg:block xl:block h-screen w-1/2"
        />
    );
};

export default Image;
