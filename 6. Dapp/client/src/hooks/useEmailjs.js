import emailjs from "@emailjs/browser";

export default function useEmailjs() {
  async function sendAddressToOwner(ethAddress) {
    const templateParams = {
      message: `Veuillez inscrire ${ethAddress} à la liste des votants`,
    };
    try {
      const message = await emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_PUBLIC_KEY
        )
        .then(
          (response) => {
            return response;
          },
          (err) => {
            console.error("useEmailjs FAILED...", err);
            return err;
          }
        );

      return message;
    } catch (err) {
      console.error("useEmailjs exception", err);
      return err;
    }
  }

  return { sendAddressToOwner };
}
