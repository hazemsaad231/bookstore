import { useEffect, useState } from "react";
import offer from "../../assets/img/offer.webp";

const Offer = () => {
    const targetDate = new Date("2025-12-31T23:59:59").getTime();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let animationFrameId: number;

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });

            animationFrameId = requestAnimationFrame(updateTimer);
        };

        updateTimer(); // تشغيل التايمر فورًا

        return () => cancelAnimationFrame(animationFrameId); // تنظيف عند إزالة المكون
    }, [targetDate]);

    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-around items-center bg-gradient-to-r from-red-100 to-white-100 p-4 rounded-xl m-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-orange-500">
                    All books are 50% off now!
                    <div>Don't miss this offer</div>
                </h1>
                <p className="text-gray-500 w-full p-2 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 m-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati repellendus recusandae aut nulla voluptas illum.
                </p>

                <table>
                    <thead className="text-gray-400">
                        <tr>
                            <th className="p-2">Days</th>
                            <th className="p-2">Hours</th>
                            <th className="p-2">Minutes</th>
                            <th className="p-2">Seconds</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center text-orange-500 text-2xl font-semibold">
                            <td>{timeLeft.days}</td>
                            <td>{timeLeft.hours}</td>
                            <td>{timeLeft.minutes}</td>
                            <td>{timeLeft.seconds}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <img src={offer} alt="" className="w-80 sm:w-80 md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-xl mt-10" />
        </div>
    );
};

export default Offer;
