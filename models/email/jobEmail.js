const jobEmail = (prepaId, username, prepaTitle, stepNumber) => {
	const promise = new Promise((res, rej) => {
		if (prepaId && username && prepaTitle && stepNumber) {
			const url = `${process.env.NEXT_PUBLIC_BASE_URL}/preparation/${prepaId}`;
			const email = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd">
    <html lang="fr" style="margin: 0;padding: 0;border: 0;">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Montserrat', sans-serif;background-color: #88c2dd;font-size: 18px;max-width: 800px;margin: 0 auto;padding: 2%;color: #141414;">
        <div style="background-color: #f4f4f4;">
            <div style="padding: 2%;">
                <h2>Alerte pour votre préparation</h2>

                <h4>Bonjour <b>${username}</b></h4>
                
                <p>
                  Votre Alerte pour la préparation: ${prepaTitle}
                </p>
                <h6>
                  Étape ${stepNumber} Terminé !
                </h6>
                <p>
                  Pour plus d'information sur la suite de votre préparation suivez ce lien :
                </p>
                <span>
                  <a href=${url}>${url}</a>
                </span>
            </div>
        </div>    
    </body>
    </html>
    `;
			res(email);
		} else {
			rej("invalid attribute");
		}
	});
	return promise;
};

export default jobEmail;
