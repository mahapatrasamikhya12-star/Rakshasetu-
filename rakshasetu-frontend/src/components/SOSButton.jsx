import { useState } from "react";

export default function SOSButton() {

    const [sending, setSending] = useState(false);

    // PLAY SIREN
    const playSiren = () => {

        const audio = new Audio("/sounds/siren.mp3");

        audio.play();
    };

    const handleSOS = () => {

        // GET CONTACTS
        const contacts = JSON.parse(
            localStorage.getItem("emergencyContacts")
        ) || [];

        // CHECK CONTACTS
        if (contacts.length === 0) {

            alert(
                "Please save emergency contacts first"
            );

            return;
        }

        // START LOADING
        setSending(true);

        // PLAY SIREN
        playSiren();

        // PHONE VIBRATION
        if (navigator.vibrate) {

            navigator.vibrate([
                500,
                300,
                500,
                300,
                1000
            ]);
        }

        // GET LIVE LOCATION
        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                position.coords.latitude;

                const longitude =
                position.coords.longitude;

                const mapsLink =

`https://www.google.com/maps?q=${latitude},${longitude}`;

                // MESSAGE
                const message =

`🚨 EMERGENCY SOS ALERT 🚨

I may be in danger.

📍 My Live Location:
${mapsLink}

Please help immediately.

— Sent via Rakshasetu`;

                // SEND TO ALL CONTACTS
                contacts.forEach(

                    (contact, index) => {

                        const phone =
                        contact.phone.replace(/\D/g, "");

                        const whatsappNumber =

                        phone.startsWith("91")

                        ? phone

                        : "91" + phone;

                        setTimeout(() => {

                            window.open(

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,

                                "_blank"
                            );

                        }, index * 1500);
                    }
                );

                // OPTIONAL AUTO CALL 112
                setTimeout(() => {

                    window.location.href = "tel:112";

                }, 2500);

                alert(
                    "🚨 SOS Sent Successfully"
                );

                setSending(false);

            },

            () => {

                alert(
                    "Location permission denied"
                );

                setSending(false);
            }
        );
    };

    return (

        <div className="flex justify-center items-center py-20">

            <button

                onClick={handleSOS}

                disabled={sending}

                className="
                    w-60
                    h-60
                    rounded-full
                    bg-red-600
                    hover:bg-red-700
                    active:scale-95
                    transition-all
                    text-white
                    font-black
                    text-5xl
                    shadow-2xl
                    shadow-red-500/50
                    animate-pulse
                    disabled:opacity-60
                "
            >

                {
                    sending
                    ? "Sending..."
                    : "🚨 SOS"
                }

            </button>

        </div>
    );
}