import img from "../../assets/img/img.jpeg";
import { useState, useEffect } from "react";

const Image = () => {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowImage(window.innerWidth >= 768); // تحميل الصورة فقط إذا كانت الشاشة أكبر من 768px
        };

        handleResize(); // استدعاء أولي للتحقق من الحجم عند التحميل
        window.addEventListener("resize", handleResize); // تحديث عند تغيير الحجم

        return () => window.removeEventListener("resize", handleResize); // تنظيف الحدث عند تفريغ المكون
    }, []);

    return (
        <div>
            {showImage && (
                <img
                    id="lazy-image"
                    src={img}
                    alt="Large Screen Image"
                    loading="lazy"
                    className="hidden sm:hidden md:block lg:block xl:block h-screen w-1/2"
                />
            )}
        </div>
    );
};

export default Image;
