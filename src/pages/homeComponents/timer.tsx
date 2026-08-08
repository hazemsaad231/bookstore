import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import offer from "../../assets/img/offer.png";

type OfferProps = {
    /** Offer end date. Falls back to the last day of the current year when omitted. */
    endsAt?: string | Date;
};

const pad = (value: number) => String(value).padStart(2, "0");

const getRemaining = (target: number) => {
    const distance = target - Date.now();

    if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }

    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        ended: false,
    };
};

const Offer = ({ endsAt }: OfferProps) => {
    // Rolling target: the old hard-coded "2025-12-31" had already passed,
    // which is why the countdown was stuck at zero.
    const targetTime = useMemo(() => {
        if (endsAt) return new Date(endsAt).getTime();
        return new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
    }, [endsAt]);

    const [timeLeft, setTimeLeft] = useState(() => getRemaining(targetTime));

    useEffect(() => {
        setTimeLeft(getRemaining(targetTime));

        // Tick once per second instead of requestAnimationFrame, which re-rendered ~60 times/second
        const intervalId = setInterval(() => {
            const next = getRemaining(targetTime);
            setTimeLeft(next);
            if (next.ended) clearInterval(intervalId);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetTime]);

    const units = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <section className="my-8 px-4 sm:px-6">
            <div
                className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 rounded-3xl p-6 sm:p-10 overflow-hidden"
                style={{ backgroundColor: "rgb(250, 245, 239)" }}
            >
                {/* Copy + countdown */}
                <div className="flex flex-col items-center md:items-start text-center md:text-start w-full md:w-1/2">
                    <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-primary uppercase bg-white px-4 py-1 rounded-full border border-orange-100 mb-4">
                        Limited Time
                    </span>

                    <h2 className="text-2xl sm:text-3xl xl:text-4xl font-serif font-bold text-slate-900 leading-tight">
                        All books are <span className="text-primary">50% off</span> now!
                    </h2>
                    <p className="text-lg sm:text-xl font-semibold text-slate-700 mt-2">
                        Don&apos;t miss this offer
                    </p>

                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-3 max-w-md">
                        Grab the chance before the offer ends and get your favourite books at half price.
                    </p>

                    {/* Countdown */}
                    {timeLeft.ended ? (
                        <p className="mt-6 text-base font-semibold text-slate-500">
                            This offer has ended — stay tuned for our next one.
                        </p>
                    ) : (
                        <div
                            className="grid grid-cols-4 gap-2 sm:gap-3 mt-6 w-full max-w-sm md:max-w-md"
                            role="timer"
                            aria-live="off"
                        >
                            {units.map((unit) => (
                                <div
                                    key={unit.label}
                                    className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 py-3 sm:py-4"
                                >
                                    <span className="text-xl sm:text-3xl font-bold text-primary tabular-nums">
                                        {pad(unit.value)}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">
                                        {unit.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <Link
                        to="/login"
                        className="mt-6 inline-flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-md"
                    >
                        <FaBookOpen size={16} />
                        <span>Shop Now</span>
                    </Link>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={offer}
                        alt="50% off on all books"
                        className="w-full max-w-sm md:max-w-full rounded-2xl object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default Offer;
